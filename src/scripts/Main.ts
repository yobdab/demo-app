/// <reference path="./../../vendor/typings/globals/node/index.d.ts" />
import './../styles/reset.css!';
import './../styles/main.css!';
import {inject} from './imports/DependencyInjection';
import {Promise} from './imports/Promises';
import {RemoteFileRequest} from './remote/RemoteFileRequest';
import {InitConfig} from './initialization/InitConfig';
import {VarnishLogParser} from './Parsing/VarnishLogParser';
import {VarnishLog} from './Parsing/VarnishLog';
import {LogAnalyzer} from './Analyzing/LogAnalyzer';
import {AccesedHost} from './Analyzing/AccesedHost';
import {AccessedFile} from './Analyzing/AccessedFile';

@inject(RemoteFileRequest, VarnishLogParser, LogAnalyzer)
export class Main {

  constructor(private remoteFileRequest:RemoteFileRequest,
              private logFileParser:VarnishLogParser,
              private logAnalyzer:LogAnalyzer) {

  }

  public initialize(daAnchor:HTMLElement, config:InitConfig):void{
    this.remoteFileRequest.getFileContent(config.logFileUrl).then((fileContent) => {
      const parsedLog:Array<VarnishLog> = this.logFileParser.parseLog(fileContent);
      const topHosts:Array<AccesedHost> = this.logAnalyzer.getTopHosts(parsedLog, 5);
      const topFiles:Array<AccessedFile> = this.logAnalyzer.getTopFiles(parsedLog, 5);

      console.log('topHosts', topHosts);
      console.log('topFiles', topFiles);
    }).catch((errorMessage) => {
      console.error(`Error loading file content`, errorMessage);
    });
  }

}
