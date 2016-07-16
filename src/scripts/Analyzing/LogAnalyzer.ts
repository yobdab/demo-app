import {VarnishLog} from '../Parsing/VarnishLog';
import {TopHosts} from '../Parsing/TopHosts';
import {TopFiles} from '../Parsing/TopFiles';

export class LogAnalyzer {
  public getTopHosts(log:Array<VarnishLog>, hostsNumber:number):Array<TopHosts> {
    let hostsCount:Array<TopHosts> = [];
    for (let line of log) {
      let found = hostsCount.some((el:TopHosts) => {
        return el.host === line.host;
      });
      if (!found) {
        hostsCount.push({
          host: line.host,
          count: log.filter((server) => server.host === line.host).length
        });
      }
    }
    return hostsCount.sort(this.sortComparator).reverse().slice(0, hostsNumber);
  }

  public getTopFiles(log:Array<VarnishLog>, filesNumber:number):Array<TopFiles> {
    let filesCount:Array<TopFiles> = [];
    for (let line of log) {
      let found = filesCount.some((el:TopFiles) => {
        return el.file === line.file;
      });
      if (!found) {
        filesCount.push({
          file: line.file,
          count: log.filter((server) => server.file === line.file).length
        });
      }
    }
    return filesCount.sort(this.sortComparator).reverse().slice(0, filesNumber);
  }

  private sortComparator(el1:any, el2:any):number {
    return el1.count - el2.count;
  }
}
