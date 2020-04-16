// @flow

export type RouteType = {|
  method: string,
  path: string,
  handler: Function,
  authenticate?: boolean,
  role?: string,
  fetchData?: Object,
|};
