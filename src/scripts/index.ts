import {DemoApp} from './DemoApp';

const demoApp:DemoApp = new DemoApp();
demoApp.initialize(
  document.getElementById('demo-app-container'),
  {
    logFileUrl: '/public/varnish.log',
    rssFeedUrl: 'http://www.vg.no/rss/feed/forsiden/?frontId=1',
    jsonFeedUrl: 'http://rexxars.com/playground/testfeed/'
  }
);
