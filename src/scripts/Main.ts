import './../styles/reset.css!';
import './../styles/main.css!';
import {inject} from './imports/DependencyInjection';
import {RemoteFileRequest} from './remote/RemoteFileRequest';
import {InitConfig} from './initialization/InitConfig';
import {VarnishLogParser} from './Parsing/VarnishLogParser';
import {VarnishLog} from './Parsing/VarnishLog';
import {LogAnalyzer} from './Analyzing/LogAnalyzer';
import {AccesedHost} from './Analyzing/AccesedHost';
import {AccessedFile} from './Analyzing/AccessedFile';
import {Tabs} from './Tabs/Tabs';

@inject(RemoteFileRequest, VarnishLogParser, LogAnalyzer, Tabs)
export class Main {

  constructor(private remoteFileRequest:RemoteFileRequest,
              private logFileParser:VarnishLogParser,
              private logAnalyzer:LogAnalyzer,
              private tabs:Tabs) {

  }

  public initialize(daAnchor:HTMLElement, config:InitConfig):void {
    this.tabs.initialize(daAnchor);
    this.remoteFileRequest.getFileContent(config.logFileUrl).then((fileContent) => {
      const parsedLog:Array<VarnishLog> = this.logFileParser.parseLog(fileContent);
      const topHosts:Array<AccesedHost> = this.logAnalyzer.getTopHosts(parsedLog, 5);
      const topFiles:Array<AccessedFile> = this.logAnalyzer.getTopFiles(parsedLog, 5);

      this.tabs.setTabContent(1, topHosts.map((item) => {
        return item.host;
      }).toString());
      this.tabs.setTabContent(2, topFiles.map((item) => {
        return item.file;
      }).toString());
    }).catch((errorMessage) => {
      console.error(`Error loading file content`, errorMessage);
    });
  }

}
