// @flow

import type { Method } from 'axios';

export type ActionObjectType = {|
  type: string,
  payload: Object,
  params?: Object,
  token?: string,
|};

export type ActionRequestType = {|
  type: string,
  payload: Object,
|};

export type ActionSuccessType = {|
  type: string,
  payload: Object,
  data?: Object,
|};

export type ActionFailureType = {|
  type: string,
  payload: Object,
  error?: Object,
|};

export type ApiConfigType = {|
  method: Method,
  url: string,
  headers?: Object,
  authenticated?: bool,
|};
