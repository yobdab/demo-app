import {Main} from './Main';
import {Container} from './imports/DependencyInjection';

export class DemoApp {

  private main:Main;

  constructor() {
    var container:Container = new Container();
    this.main = container.get(Main);
  }
  public initialize(daAnchor:HTMLElement, config:any):void {
    this.main.initialize(daAnchor, config);
  }
}
