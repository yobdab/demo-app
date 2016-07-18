/// <reference path="../../references.ts" />
import {RestrictedContainer} from '../containers/RestrictedContainer';

export class SingleUnitIsolator {

  private container:RestrictedContainer;

  constructor() {
    this.container = new RestrictedContainer();
  }

  public static around(fn:any):SingleUnitIsolator {
    const isolator:SingleUnitIsolator = new SingleUnitIsolator();
    isolator.allowReal(fn);
    return isolator;
  }

  public allowReal(fn:any):void {
    this.container.allowAutoRegistering(fn);
  }

  public get(key:any):any {
    return this.container.get(key);
  }

  public registerInstance(key:any, instance:any) {
    this.container.registerInstance(key, instance);
  }

  public stub(key:any):any {
    const stub:any = sinon.createStubInstance(key);
    this.registerInstance(key, stub);
    return stub;
  }
}
