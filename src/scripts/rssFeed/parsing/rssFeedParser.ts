import {ArticlesList} from '../ArticlesList';
export class RssFeedParser {

  public getArticles(data:XMLDocument):ArticlesList {
    let articlesList:ArticlesList = [];
    let items:NodeListOf<Element> = data.getElementsByTagName('item');

    for (let i:number = 0; i < items.length; i++) {
      let title:string = items[i].getElementsByTagName('title')[0].innerHTML;
      let date:string = items[i].getElementsByTagName('pubDate')[0].innerHTML;
      articlesList.push({title: title, date: date});
    }
    return articlesList;
  }
}
