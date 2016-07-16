import {Promise, Deferred, defer} from '../imports/Promises';

export class RemoteFileRequest {

  private request:XMLHttpRequest;
  private READY_STATUS_CODE:number = 200;
  private FINISHED_STATE_CODE:number = 4;

  public getFileContent(path:string):Promise<any> {
    let defferedRequest:Deferred<any> = defer();
    this.request = new XMLHttpRequest();

    this.request.onreadystatechange = () => {
      if (this.isRequestReady()) {
        defferedRequest.resolve(this.request.responseText);
      }
    };

    this.request.open('GET', path, true);
    this.request.send();

    return defferedRequest.promise;
  }

  private isRequestReady():boolean {
    return this.request.readyState === this.FINISHED_STATE_CODE && this.request.status === this.READY_STATUS_CODE;
  }
}
