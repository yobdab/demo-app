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
import {Promise} from '../imports/Promises';

@inject(RemoteFileRequest, VarnishLogParser, LogAnalyzer, Tabs, DomElementAdapter)
export class VarnishLogProvider {
  static DEFAULT_TABLE_LIMIT:number = 5;

  constructor(private remoteFileRequest:RemoteFileRequest,
              private varnishLogParser:VarnishLogParser,
              private logAnalyzer:LogAnalyzer,
              private tabs:Tabs,
              private domElementAdapter:DomElementAdapter) {

  }

  public initialize(logFileUrl:string):Promise<any> {
    return this.remoteFileRequest.getFileContent(logFileUrl, 'responseText').then((fileContent) => {
      const parsed:Array<VarnishLog> = this.varnishLogParser.parseLog(fileContent);
      const topHosts:Array<AccesedHost> = this.logAnalyzer.getTopHosts(parsed, VarnishLogProvider.DEFAULT_TABLE_LIMIT);
      const topFiles:Array<AccessedFile> = this.logAnalyzer.getTopFiles(parsed, VarnishLogProvider.DEFAULT_TABLE_LIMIT);
      const topHostsTable:HTMLTableElement = this.domElementAdapter.createTableFromData(topHosts);
      const topFilesTable:HTMLTableElement = this.domElementAdapter.createTableFromData(topFiles);

      this.tabs.setTabContent(TabsList.VARNISH_LOG_FEED, topHostsTable);
      this.tabs.setTabContent(TabsList.VARNISH_LOG_FEED, topFilesTable);
    }).catch((errorMessage) => {
      this.tabs.setTabContentWithError(TabsList.VARNISH_LOG_FEED, `Error loading varnish log ${errorMessage}`);
    });
  }
}
