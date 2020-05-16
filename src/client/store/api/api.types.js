// @flow

import type { Method } from 'axios';

export type ActionObjectType = {|
  type: string,
  urlParams?: Object,
  params?: Object,
  data?: Object,
  payload?: Object,
  token?: string,
  error?: Object,
  response?: Object,
|};

export type ApiConfigType = {|
  method: Method,
  url: string,
  headers?: Object,
  authenticated?: bool,
|};
