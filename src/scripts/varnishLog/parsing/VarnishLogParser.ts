import {VarnishLog} from '../VarnishLog';

export class VarnishLogParser {

  private ipMatch:RegExp = /(\d+(?:\.\d+){3})/;
  private fileMatch:RegExp = /\"[A-Z]*\s([^\"^\s]*?)\s/;
  private responseMatch:RegExp = /\s\d{3}\s(\d*)/;

  public parseLog(log:string):Array<VarnishLog> {
    let parsedLog:Array<VarnishLog> = [];
    if (log.length > 0) {
      parsedLog = log.trim()
        .split('\n')
        .reduce((parsedLine, line):any => {
          const hostIp:RegExpMatchArray = line.match(this.ipMatch);
          const file:RegExpMatchArray = line.match(this.fileMatch);
          const responseSize:RegExpMatchArray = line.match(this.responseMatch);
          if (hostIp) {
            parsedLine.push(new VarnishLog(hostIp[1], file[1], parseInt(responseSize[1], 10)));
          }
          return parsedLine;
        }, [new VarnishLog()]);
    }
    return parsedLog;
  }

}
