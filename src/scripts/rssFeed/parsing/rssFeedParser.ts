import {ArticlesList} from '../ArticlesList';
import {FeedItem} from '../FeedItem';
import {moment} from '../../imports/Moment';

export class RssFeedParser {
  private xmlSerializer:XMLSerializer = new XMLSerializer();

  public getArticles(data:XMLDocument):ArticlesList {

    let articlesList:ArticlesList = [];
    let items:NodeListOf<Element> = data.getElementsByTagName('item');
    for (let i:number = 0; i < items.length; i++) {
      let title:string = this.getTagInnerText(items[i], 'title');
      let date:string = this.getTagInnerText(items[i], 'pubDate');
            articlesList.push({title: title, date: moment(date).format('LLL')});

    }
    return articlesList.sort(this.compareDates);
  }

  private compareDates(article1:FeedItem, article2:FeedItem):number {
    return (new Date(article2.date).getTime() / 1000) - (new Date(article1.date).getTime() / 1000);
  }

  /**
   * Very ugly implementation of getting inner text from XML tag because of compatiblity with IE.
   * For sure shuld be replaced with some nice library in future.
   */
  private getTagInnerText(parent:Element, tagName:string):string {
    const nodes:NodeListOf<Element> = parent.getElementsByTagName(tagName);
    const xmlstring:string = this.xmlSerializer.serializeToString(nodes[0]);
    const cleanString:string = xmlstring.replace(`<${tagName}>`, '').replace(`</${tagName}>`, '');
    return cleanString;
  }
}
