export class VarnishLog {
  constructor(public host:string = '',
              public file:string = '',
              public responseSize:number = 0) {
  };
}

