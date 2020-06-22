export class ConsoleColors {
  public static readonly Reset: string = '\x1b[0m%s\x1b[0m';
  public static readonly Bright: string = '\x1b[1m%s\x1b[0m';
  public static readonly Dim: string = '\x1b[2m%s\x1b[0m';
  public static readonly Underscore: string = '\x1b[4m%s\x1b[0m';
  public static readonly Blink: string = '\x1b[5m%s\x1b[0m';
  public static readonly Reverse: string = '\x1b[7m%s\x1b[0m';
  public static readonly Hidden: string = '\x1b[8m%s\x1b[0m';

  public static readonly FgBlack: string = '\x1b[30m%s\x1b[0m';
  public static readonly FgRed: string = '\x1b[31m%s\x1b[0m';
  public static readonly FgGreen: string = '\x1b[32m%s\x1b[0m';
  public static readonly FgYellow: string = '\x1b[33m%s\x1b[0m';
  public static readonly FgBlue: string = '\x1b[34m%s\x1b[0m';
  public static readonly FgMagenta: string = '\x1b[35m%s\x1b[0m';
  public static readonly FgCyan: string = '\x1b[36m%s\x1b[0m';
  public static readonly FgWhite: string = '\x1b[37m%s\x1b[0m';

  public static readonly BgBlack: string = '\x1b[40m%s\x1b[0m';
  public static readonly BgRed: string = '\x1b[41m%s\x1b[0m';
  public static readonly BgGreen: string = '\x1b[42m%s\x1b[0m';
  public static readonly BgYellow: string = '\x1b[43m%s\x1b[0m';
  public static readonly BgBlue: string = '\x1b[44m%s\x1b[0m';
  public static readonly BgMagenta: string = '\x1b[45m%s\x1b[0m';
  public static readonly BgCyan: string = '\x1b[46m%s\x1b[0m';
  public static readonly BgWhite: string = '\x1b[47m%s\x1b[0m';
}
