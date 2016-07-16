import {VarnishLog} from './VarnishLog';

export class VarnishLogParser {

  private ipMatch:RegExp = /(\d+(?:\.\d+){3})/;
  private dateTime:RegExp = /\[(.*)\]/;
  private fileMatch:RegExp = /\"[A-Z]*\s([^\"^\s]*?)\s/;

  public parseLog(log:string):Array<VarnishLog> {
    const parsedLog:Array<VarnishLog> = log.trim()
      .split('\n')
      .reduce((parsedLine, line):any => {
        const hostIp = line.match(this.ipMatch);
        const dateTime = line.match(this.dateTime);
        const file = line.match(this.fileMatch);

        parsedLine.push(new VarnishLog(hostIp[1], dateTime[1], file[1]));

        return parsedLine;
      }, [new VarnishLog()]);
    return parsedLog;
  }

}
