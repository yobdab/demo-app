/* tslint:disable:max-line-length */
/// <reference path="../../../vendor/jspm_packages/npm/aurelia-pal@1.0.0-beta.1/aurelia-pal.d.ts" />
/// <reference path="../../../vendor/jspm_packages/npm/aurelia-metadata@1.0.0-beta.1/aurelia-metadata.d.ts" />
/// <reference path="../../../vendor/jspm_packages/npm/aurelia-logging@1.0.0-beta.1/aurelia-logging.d.ts" />
/// <reference path="../../../vendor/jspm_packages/github/aurelia/dependency-injection@1.0.0-beta.1/aurelia-dependency-injection.d.ts" />
/* tslint:enable:max-line-length */

import {transient, inject, Container, resolver, Resolver} from 'aurelia-dependency-injection';
export {transient, inject, Container, Local, Parent, Resolver}

@resolver()
class Local implements Resolver {

  constructor(private key:any) {
  }

  public static of(key:any):Local {
    return new Local(key);
  }

  public get(container:Container):any {
    if (!container.hasResolver(this.key)) {
      container.autoRegister(this.key);
    }
    return container.get(this.key);
  }
}

@resolver()
class Parent implements Resolver {

  constructor(private key:any) {
  }

  public static of(key:any):Parent {
    return new Parent(key);
  }

  public get(container:any):any {
    let instance:any = null;
    if (container.parent) {
      instance = container.parent.get(Local.of(this.key));
    }
    return instance;
  }
}
