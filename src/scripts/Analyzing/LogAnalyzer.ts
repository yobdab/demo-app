import {VarnishLog} from '../Parsing/VarnishLog';
import {AccesedHost} from './AccesedHost';
import {AccessedFile} from './AccessedFile';

export class LogAnalyzer {
  public getTopHosts(log:Array<VarnishLog>, hostsNumber:number):Array<AccesedHost> {
    let hostsCount:Array<AccesedHost> = [];
    for (let line of log) {
      let found = hostsCount.some((el:AccesedHost) => {
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

  public getTopFiles(log:Array<VarnishLog>, filesNumber:number):Array<AccessedFile> {
    let filesCount:Array<AccessedFile> = [];
    for (let line of log) {
      let found = filesCount.some((el:AccessedFile) => {
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

  private sortComparator(el1:AccesedHost|AccessedFile, el2:AccesedHost|AccessedFile):number {
    return el1.count - el2.count;
  }
}
