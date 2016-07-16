/// <reference path="./../../vendor/typings/globals/node/index.d.ts" />
import './../styles/reset.css!';
import './../styles/main.css!';

import {inject} from './imports/DependencyInjection';
import {RemoteFileRequest} from './remote/RemoteFileRequest';
import {InitConfig} from './initialization/InitConfig';

@inject(RemoteFileRequest)
export class Main {

  constructor(private remoteFileRequest:RemoteFileRequest) {

  }

  public initialize(daAnchor:HTMLElement, config:InitConfig):void {
    this.remoteFileRequest.getFileContent(config.logFileUrl).then((fileContent) => {
      console.log('it works!', fileContent);
    }).catch((errorMessage) => {
      console.error(`Error loading file content`, errorMessage);
    });
  }

}
