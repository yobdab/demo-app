import {ArticlesList} from '../ArticlesList';
import {FeedItem} from '../FeedItem';
export class RssFeedParser {

  public getArticles(data:XMLDocument):ArticlesList {
    let articlesList:ArticlesList = [];
    let items:NodeListOf<Element> = data.getElementsByTagName('item');

    for (let i:number = 0; i < items.length; i++) {
      let title:string = items[i].getElementsByTagName('title')[0].innerHTML;
      let date:string = items[i].getElementsByTagName('pubDate')[0].innerHTML;
      articlesList.push({title: title, date: date});

    }
    return articlesList.sort(this.compareDates);
  }

  private compareDates(article1:FeedItem, article2:FeedItem):number {
    return  (new Date(article2.date).getTime() / 1000) - (new Date(article1.date).getTime() / 1000);
  }
}
