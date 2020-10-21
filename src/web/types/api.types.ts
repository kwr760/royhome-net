import { Method } from 'axios';

export interface Params {
  [key: string]: string;
}

export interface ActionObjectType {
  type: string;
  payload: unknown;
  params?: Params;
  token?: string;
}

export interface ApiRequestType {
  type: string;
  payload: unknown;
}
export interface ApiSuccessType {
  type: string;
  payload: unknown;
  data?: unknown;
}
export interface ApiFailureType {
  type: string;
  payload: unknown;
  error?: unknown;
}
export type ApiResponseType = {
  status: string;
  data?: unknown;
  error?: unknown;
}

export interface ApiConfigType {
  method: Method;
  url: string;
  headers?: {
    Authorization?: string;
  };
  authenticated?: boolean;
}
