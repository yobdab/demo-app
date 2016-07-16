import {VarnishLog} from './VarnishLog';

export class VarnishLogParser {

  private ipMatch:RegExp = /(\d+(?:\.\d+){3})/;
  private dateTime:RegExp = /\[(.*)\]/;
  private fileMatch:RegExp = /\"[A-Z]*\s([^\"^\s]*?)\s/;

  public parseLog(log:string):Array<VarnishLog> {
    let parsedLog:Array<VarnishLog> = [];
    if (log.length > 0) {
      parsedLog = log.trim()
        .split('\n')
        .reduce((parsedLine, line):any => {
          const hostIp:RegExpMatchArray = line.match(this.ipMatch);
          const dateTime:RegExpMatchArray = line.match(this.dateTime);
          const file:RegExpMatchArray = line.match(this.fileMatch);
          if (hostIp) {
            parsedLine.push(new VarnishLog(hostIp[1], dateTime[1], file[1]));
          }

          return parsedLine;
        }, [new VarnishLog()]);
    }
    return parsedLog;
  }

}
