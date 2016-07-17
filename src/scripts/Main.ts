import './../styles/reset.css!';
import './../styles/main.css!';
import {inject} from './imports/DependencyInjection';
import {InitConfig} from './initialization/InitConfig';
import {Tabs} from './tabs/Tabs';
import {VarnishLogProvider} from './varnishLog/VarnishLogProvider';
import {RssFeedProvider} from './rssFeed/RssFeedProvider';
import {JsonFeedProvider} from './json/JsonFeedProvider';

@inject(Tabs, VarnishLogProvider, RssFeedProvider, JsonFeedProvider)
export class Main {

  constructor(private tabs:Tabs,
              private varnishLogProvider:VarnishLogProvider,
              private rssFeedProvider:RssFeedProvider,
              private jsonFeedProvider:JsonFeedProvider) {

  }

  public initialize(daAnchor:HTMLElement, config:InitConfig):void {
    this.tabs.initialize(daAnchor);
    this.varnishLogProvider.initialize(config.logFileUrl);
    this.rssFeedProvider.initialize(config.rssFeedUrl);
    this.jsonFeedProvider.initialize(config.jsonFeedUrl);
  }
}
