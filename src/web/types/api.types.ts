import { Method } from 'axios';

export interface ActionObjectType {
  type: string;
  payload: unknown;
  params?: unknown;
  token?: string;
}

export interface ActionRequestType {
  type: string;
  payload: unknown;
}

export interface ActionSuccessType {
  type: string;
  payload: unknown;
  data?: unknown;
}

export interface ActionFailureType {
  type: string;
  payload: unknown;
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

export type ApiResponseType = {
  status: string;
  data?: unknown;
  error?: unknown;
}
