import {DomElementAdapter} from '../common/DomElementAdapter';
export class Tabs {
  private tabsLabels:Array<HTMLElement> = [];
  private tabsContent:Array<HTMLElement> = [];
  private CONTENT_TAB_CSS_CLASS:string = 'tab-content';

  constructor(private domElementAdapter:DomElementAdapter) {

  };

  public initialize(daAnchor:HTMLElement):void {
    const tabsElements:NodeListOf<Element> = daAnchor.getElementsByClassName('tab-label');
    const contentElements:NodeListOf<Element> = daAnchor.getElementsByClassName(this.CONTENT_TAB_CSS_CLASS);

    this.tabsLabels = [].slice.call(tabsElements);
    this.tabsContent = [].slice.call(contentElements);

    this.activateFirstElement();

    this.tabsLabels.forEach((tab) => {
      tab.onclick = () => {
        this.activateTab(tab);
      };
    });
  }

  public createTab():HTMLDivElement {
    let el:HTMLDivElement = this.domElementAdapter.createDiv();
    el.classList.add(this.CONTENT_TAB_CSS_CLASS);
    return el;
  }

  public setTabContent(tabNumber:number, content:string):void {
    this.tabsContent[tabNumber - 1].innerText = content;
  }

  private activateTab(tab:HTMLElement):void {
    const showTabIndex:number = this.tabsLabels.indexOf(tab);

    this.deactivateTabs();
    this.deactivateTabsContent();

    tab.classList.add('active');
    this.tabsContent[showTabIndex].classList.add('active');
  }

  private deactivateTabs():void {
    this.tabsLabels.forEach((element) => {
      element.classList.remove('active');
    });
  }

  private deactivateTabsContent():void {
    this.tabsContent.forEach((element) => {
      element.classList.remove('active');
    });
  }

  private activateFirstElement():void {
    this.activateTab(this.tabsLabels[0]);
  }
}
