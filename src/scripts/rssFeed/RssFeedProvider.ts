import {RemoteFileRequest} from '../remote/RemoteFileRequest';
import {Tabs} from '../tabs/Tabs';
import {inject} from '../imports/DependencyInjection';
import {DomElementAdapter} from '../common/DomElementAdapter';
import {RssFeedParser} from './parsing/rssFeedParser';
import {ArticlesList} from './ArticlesList';
import {TabsList} from '../tabs/TabsList';
import {Promise} from '../imports/Promises';

@inject(RemoteFileRequest, Tabs, DomElementAdapter, RssFeedParser)
export class RssFeedProvider {

  constructor(private remoteFileRequest:RemoteFileRequest,
              private tabs:Tabs,
              private domElementAdapter:DomElementAdapter,
              private rssFeedParser:RssFeedParser) {

  }

  public initialize(rssFeedUrl:string):Promise<any> {
    return this.remoteFileRequest.getFileContent(rssFeedUrl, 'responseXML').then((fileContent) => {
      let parsedRssFeed:ArticlesList = this.rssFeedParser.getArticles(fileContent);
      const articlesTable:HTMLTableElement = this.domElementAdapter.createTableFromData(parsedRssFeed);
      this.tabs.setTabContent(TabsList.RSS_FEED, articlesTable);
    }).catch((errorMessage) => {
      this.tabs.setTabContentWithError(TabsList.RSS_FEED, `Error loading RSS feed: ${errorMessage}`);
    });
  }
}
