export interface LogType {
  level: number,
  name: string,
}
export interface LogMsgType {
  logType: LogType,
  msg: string,
}
