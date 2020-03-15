// @flow

export type Route = {|
  method: string,
  path: string,
  handler: Function,
  authenticate?: boolean,
  role?: string,
  fetchData?: Object,
|};
