import { Method } from 'axios';

export interface Params {
  [key: string]: string;
}

export interface ApiDetailsType {
  payload?: unknown;
  params?: Params;
  token?: string;
}

export interface ApiConfigType {
  method: Method;
  path: string;
  headers?: {
    Authorization?: string;
  };
  authenticated?: boolean;
}
