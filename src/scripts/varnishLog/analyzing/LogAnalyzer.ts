import {VarnishLog} from '../VarnishLog';
import {AccesedHost} from './AccesedHost';
import {AccessedFile} from './AccessedFile';

export class LogAnalyzer {

  public getTopHosts(log:Array<VarnishLog>, hostsNumber:number):Array<AccesedHost> {
    let hostsCount:Array<AccesedHost> = [];
    for (let line of log) {
      let found:boolean = hostsCount.some((el:AccesedHost) => {
        return el.host === line.host;
      });

      if (!found) {
        let hostGrouped:Array<VarnishLog> = log.filter((server) => server.host === line.host);
        hostsCount.push({
          host: line.host,
          traffic: hostGrouped.reduce((traffic, host) => {
            traffic += host.responseSize;
            return traffic;
          }, 0)
        });
      }
    }
    return hostsCount.sort(this.trafficComparator).reverse().slice(0, hostsNumber);
  }

  public getTopFiles(log:Array<VarnishLog>, filesNumber:number):Array<AccessedFile> {
    let filesCount:Array<AccessedFile> = [];
    for (let line of log) {
      let found:boolean = filesCount.some((el:AccessedFile) => {
        return el.file === line.file;
      });
      if (!found) {
        filesCount.push({
          file: line.file,
          requests: log.filter((server) => server.file === line.file).length
        });
      }
    }
    return filesCount.sort(this.sortComparator).reverse().slice(0, filesNumber);
  }

  private trafficComparator(el1:AccesedHost, el2:AccesedHost):number {
    return el1.traffic - el2.traffic;
  }

  private sortComparator(el1:AccessedFile, el2:AccessedFile):number {
    return el1.requests - el2.requests;
  }

}
