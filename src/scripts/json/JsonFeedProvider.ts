import {RemoteFileRequest} from '../remote/RemoteFileRequest';
import {Tabs} from '../tabs/Tabs';
import {inject} from '../imports/DependencyInjection';
import {TabsList} from '../tabs/TabsList';

@inject(RemoteFileRequest, Tabs)
export class JsonFeedProvider {

  constructor(private remoteFileRequest:RemoteFileRequest,
              private tabs:Tabs) {

  }

  public initialize(jsonFeedUrl:string):void {
    this.remoteFileRequest.getFileContent(jsonFeedUrl, 'responseXML').then(() => {
      // cannot implement, as http://rexxars.com/playground/testfeed/ doesn't exist
    }).catch((errorMessage) => {
      this.tabs.setTabContentWithError(TabsList.JSON_FEED, `Error loading JSON feed: ${errorMessage}`);
    });
  }
}
