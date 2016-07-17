import {AccesedHost} from './analyzing/AccesedHost';
import {AccessedFile} from './analyzing/AccessedFile';
import {VarnishLog} from './VarnishLog';
import {RemoteFileRequest} from '../remote/RemoteFileRequest';
import {VarnishLogParser} from './parsing/VarnishLogParser';
import {LogAnalyzer} from './analyzing/LogAnalyzer';
import {Tabs} from '../tabs/Tabs';
import {inject} from '../imports/DependencyInjection';
import {DomElementAdapter} from '../common/DomElementAdapter';
import {TabsList} from '../tabs/TabsList';

@inject(RemoteFileRequest, VarnishLogParser, LogAnalyzer, Tabs, DomElementAdapter)
export class VarnishLogProvider {

  constructor(private remoteFileRequest:RemoteFileRequest,
              private logFileParser:VarnishLogParser,
              private logAnalyzer:LogAnalyzer,
              private tabs:Tabs,
              private domElementAdapter:DomElementAdapter) {

  }

  public initialize(logFileUrl:string):void {
    this.remoteFileRequest.getFileContent(logFileUrl, 'responseText').then((fileContent) => {
      console.log(fileContent);
      const parsedLog:Array<VarnishLog> = this.logFileParser.parseLog(fileContent);
      const topHosts:Array<AccesedHost> = this.logAnalyzer.getTopHosts(parsedLog, 5);
      const topFiles:Array<AccessedFile> = this.logAnalyzer.getTopFiles(parsedLog, 5);
      const topHostsTable:HTMLTableElement = this.domElementAdapter.createTableFromData(topHosts);
      const topFilesTable:HTMLTableElement = this.domElementAdapter.createTableFromData(topFiles);

       this.tabs.setTabContent(TabsList.VARNISH_LOG_FEED, topHostsTable);
       this.tabs.setTabContent(TabsList.VARNISH_LOG_FEED, topFilesTable);
    }).catch((errorMessage) => {
      this.tabs.setTabContentWithError(TabsList.VARNISH_LOG_FEED, `Error loading varnish log ${errorMessage}`);
    });
  }
}
