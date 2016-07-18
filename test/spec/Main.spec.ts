/// <reference path="../references.ts" />

import {SingleUnitIsolator} from '../utils/mocking/SingleUnitIsolator';
import {VarnishLogProvider} from '../../src/scripts/varnishLog/VarnishLogProvider';
import {Main} from '../../src/scripts/Main';
import {RssFeedProvider} from '../../src/scripts/rssFeed/RssFeedProvider';
import {JsonFeedProvider} from '../../src/scripts/json/JsonFeedProvider';
import {Tabs} from '../../src/scripts/tabs/Tabs';
import {anInitConfig} from '../builders/InitConfigBuilder';

describe('Main', () => {

  let main:Main;
  let tabs:Tabs;
  let varnishLogProvider;
  let rssFeedProvider;
  let jsonFeedProvider;

  beforeEach(() => {
    const isolator:SingleUnitIsolator = SingleUnitIsolator.around(Main);
    tabs = isolator.stub(Tabs);
    varnishLogProvider = isolator.stub(VarnishLogProvider);
    rssFeedProvider = isolator.stub(RssFeedProvider);
    jsonFeedProvider = isolator.stub(JsonFeedProvider);

    main = isolator.get(Main);
  });

  it('initializes tabs', () => {
    // given
    const daAnchor = document.createElement('div');
    const initConfig = anInitConfig().build();

    // when
    main.initialize(daAnchor, initConfig);

    // then
    tabs.initialize.should.have.been.calledWith(daAnchor);
  });

  it('initializes varnish log provider', () => {
    // given
    const daAnchor = document.createElement('div');
    const expectedLogUrl = 'some/url/to/varnish/log';
    const initConfig = anInitConfig().withLogFileUrl(expectedLogUrl).build();

    // when
    main.initialize(daAnchor, initConfig);

    // then
    varnishLogProvider.initialize.should.have.been.calledWith(expectedLogUrl);
  });

  it('initializes Rss feed log provider', () => {
    // given
    const daAnchor = document.createElement('div');
    const expectedRssUrl = 'some/url/to/rss/feed';
    const initConfig = anInitConfig().withRssFeedUrl(expectedRssUrl).build();

    // when
    main.initialize(daAnchor, initConfig);

    // then
    rssFeedProvider.initialize.should.have.been.calledWith(expectedRssUrl);
  });

  it('initializes JSON feed log provider', () => {
    // given
    const daAnchor = document.createElement('div');
    const expectedJsonUrl = 'some/url/to/json/feed';
    const initConfig = anInitConfig().withJsonFeedUrl(expectedJsonUrl).build();

    // when
    main.initialize(daAnchor, initConfig);

    // then
    jsonFeedProvider.initialize.should.have.been.calledWith(expectedJsonUrl);
  });
});
