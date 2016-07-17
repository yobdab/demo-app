import {Promise, Deferred, defer} from '../imports/Promises';
import {ResponseType} from './ResponseType';

export class RemoteFileRequest {

  private READY_STATUS_CODE:number = 200;
  private FINISHED_STATE_CODE:number = 4;

  public getFileContent(path:string, type:ResponseType):Promise<any> {
    let request:XMLHttpRequest = new XMLHttpRequest();
    let defferedRequest:Deferred<any> = defer();

    request.onreadystatechange = () => {
      if (this.isRequestReady(request)) {
        defferedRequest.resolve(request[type]);
      }
      if (this.isFailedRequest(request)) {
        let response:string = request.response || 'empty response, possible network error';
        defferedRequest.reject(response);
      }

    };

    request.open('GET', path, true);
    request.send();

    return defferedRequest.promise;
  }

  private isRequestReady(request:XMLHttpRequest):boolean {
    return request.readyState === this.FINISHED_STATE_CODE && request.status === this.READY_STATUS_CODE;
  }

  private isFailedRequest(request:XMLHttpRequest):boolean {
    return request.readyState === this.FINISHED_STATE_CODE && request.status !== this.READY_STATUS_CODE;
  }
}
