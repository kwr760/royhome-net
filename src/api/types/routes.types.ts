import { Request, Response } from 'express';
import { ApiResponseType } from './handler.types';

export interface HandlerFunctionType {
 (req: Request, res: Response): Promise<ApiResponseType> | ApiResponseType;
}
export interface RouteType {
  method: string;
  path: string;
  handler: HandlerFunctionType;
  authenticate?: boolean;
  role?: string;
  fetchData?: unknown;
}
