import {InitConfig} from '../../src/scripts/initialization/InitConfig';

class InitConfigBuilder {

  private initConfig:InitConfig;

  constructor() {
    this.initConfig = <InitConfig>{
      logFileUrl: '',
      rssFeedUrl: '',
      jsonFeedUrl: ''
    };
  }

  public withLogFileUrl(logFileUrl:string):InitConfigBuilder {
    this.initConfig.logFileUrl = logFileUrl;
    return this;
  }

  public withRssFeedUrl(rssFeedUrl:string):InitConfigBuilder {
    this.initConfig.rssFeedUrl = rssFeedUrl;
    return this;
  }

  public withJsonFeedUrl(jsonFeedUrl:string):InitConfigBuilder {
    this.initConfig.jsonFeedUrl = jsonFeedUrl;
    return this;
  }

  public build():InitConfig {
    return this.initConfig;
  }
}

export function anInitConfig():InitConfigBuilder {
  return new InitConfigBuilder();
}
