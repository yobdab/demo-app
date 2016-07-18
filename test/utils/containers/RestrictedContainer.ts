import {Container, Resolver} from '../../../src/scripts/imports/DependencyInjection';

export class RestrictedContainer extends Container {

  private allowedRealTypes:Array<AnyConstructor> = [];

  public autoRegister(fn: any, key?: any):Resolver {
    if (this.allowedRealTypes.indexOf(fn) >= 0) {
      return super.autoRegister(fn, key);
    } else {
      throw new Error(`Trying to create real instance of ${fn} which was not allowed to be real in this container`);
    }
  }

  public allowAutoRegistering(fn: AnyConstructor):void {
    this.allowedRealTypes.push(fn);
  }
}

type AnyConstructor = {new(...args:any[]):any};
