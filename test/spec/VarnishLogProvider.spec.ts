/// <reference path="../references.ts" />

import {SingleUnitIsolator} from '../utils/mocking/SingleUnitIsolator';
import {VarnishLogProvider} from '../../src/scripts/varnishLog/VarnishLogProvider';
import {Tabs} from '../../src/scripts/tabs/Tabs';
import {RemoteFileRequest} from '../../src/scripts/remote/RemoteFileRequest';
import {LogAnalyzer} from '../../src/scripts/varnishLog/analyzing/LogAnalyzer';
import {VarnishLogParser} from '../../src/scripts/varnishLog/parsing/VarnishLogParser';
import {DomElementAdapter} from '../../src/scripts/common/DomElementAdapter';
import {defer} from '../../src/scripts/imports/Promises';
import {TabsList} from '../../src/scripts/tabs/TabsList';

describe('VarnishLogProvider', () => {

  let varnishLogProvider:VarnishLogProvider;
  let remoteFileRequest;
  let varnishLogParser;
  let logAnalyzer;
  let domElementAdapter;
  let tabs:Tabs;

  beforeEach(() => {
    const isolator:SingleUnitIsolator = SingleUnitIsolator.around(VarnishLogProvider);
    tabs = isolator.stub(Tabs);
    remoteFileRequest = isolator.stub(RemoteFileRequest);
    varnishLogParser = isolator.stub(VarnishLogParser);
    logAnalyzer = isolator.stub(LogAnalyzer);
    domElementAdapter = isolator.stub(DomElementAdapter);
    varnishLogProvider = isolator.get(VarnishLogProvider);
  });

  describe('when initialized', ()=> {
    it('parses retrieved log content', (done) => {
      // given
      const sampleData = 'some sample data';
      const sampleUrl = 'some/url';
      const deferredAjax = defer();
      remoteFileRequest.getFileContent.withArgs(sampleUrl, 'responseText').returns(deferredAjax.promise);

      // when
      varnishLogProvider.initialize(sampleUrl).then(dataLoaded);
      deferredAjax.resolve(sampleData);

      // then
      function dataLoaded() {
        varnishLogParser.parseLog.should.have.been.calledWith(sampleData);
        done();
      }
    });

    it('analyzes given data for top hosts and files', (done)=> {
      // given
      const sampleData = 'some sample data';
      const sampleUrl = 'some/url';
      const sampleParsedData = 'some sample parsed data';
      const deferredAjax = defer();
      varnishLogParser.parseLog.withArgs(sampleData).returns(sampleParsedData);
      remoteFileRequest.getFileContent.withArgs(sampleUrl, 'responseText').returns(deferredAjax.promise);

      // when
      varnishLogProvider.initialize(sampleUrl).then(dataLoaded);
      deferredAjax.resolve(sampleData);

      // then
      function dataLoaded() {
        logAnalyzer.getTopHosts.should.have.been.calledWith(sampleParsedData, VarnishLogProvider.DEFAULT_TABLE_LIMIT);
        logAnalyzer.getTopFiles.should.have.been.calledWith(sampleParsedData, VarnishLogProvider.DEFAULT_TABLE_LIMIT);
        done();
      }
    });

    it('create table views', (done)=> {
      // given
      const sampleData = 'some sample data';
      const sampleUrl = 'some/url';
      const parsedData = 'some sample parsed data';
      const parsedSampleHosts = 'top 5 hosts data';
      const parsedSampleFiles = 'top 5 files data';

      const deferredAjax = defer();
      varnishLogParser.parseLog.withArgs(sampleData).returns(parsedData);
      logAnalyzer.getTopHosts.withArgs(parsedData, VarnishLogProvider.DEFAULT_TABLE_LIMIT).returns(parsedSampleHosts);
      logAnalyzer.getTopFiles.withArgs(parsedData, VarnishLogProvider.DEFAULT_TABLE_LIMIT).returns(parsedSampleFiles);

      remoteFileRequest.getFileContent.withArgs(sampleUrl, 'responseText').returns(deferredAjax.promise);

      // when
      varnishLogProvider.initialize(sampleUrl).then(dataLoaded);
      deferredAjax.resolve(sampleData);

      // then
      function dataLoaded() {
        domElementAdapter.createTableFromData.should.have.been.calledWith(parsedSampleHosts);
        domElementAdapter.createTableFromData.should.have.been.calledWith(parsedSampleFiles);
        done();
      }
    });

    it('appends tables to proper tab', (done)=> {
      // given
      const sampleData = 'some sample data';
      const sampleUrl = 'some/url';
      const parsedData = 'some sample parsed data';
      const parsedSampleHosts = 'top 5 hosts data';
      const parsedSampleFiles = 'top 5 files data';
      const filesTable = document.createElement('table');
      const hostsTable = document.createElement('table');
      const deferredAjax = defer();
      varnishLogParser.parseLog.withArgs(sampleData).returns(parsedData);
      logAnalyzer.getTopHosts.withArgs(parsedData, VarnishLogProvider.DEFAULT_TABLE_LIMIT).returns(parsedSampleHosts);
      logAnalyzer.getTopFiles.withArgs(parsedData, VarnishLogProvider.DEFAULT_TABLE_LIMIT).returns(parsedSampleFiles);
      domElementAdapter.createTableFromData.withArgs(parsedSampleFiles).returns(filesTable);
      domElementAdapter.createTableFromData.withArgs(parsedSampleHosts).returns(hostsTable);
      remoteFileRequest.getFileContent.withArgs(sampleUrl, 'responseText').returns(deferredAjax.promise);

      // when
      varnishLogProvider.initialize(sampleUrl).then(dataLoaded);
      deferredAjax.resolve(sampleData);

      // then
      function dataLoaded() {
        tabs.setTabContent.should.have.been.calledWith(TabsList.VARNISH_LOG_FEED, filesTable);
        tabs.setTabContent.should.have.been.calledWith(TabsList.VARNISH_LOG_FEED, hostsTable);
        done();
      }
    });
  });

});
