import { ApiConfigType } from '../../../types/api.types';

export const ApiConfigs = {
  PUT_LOG: {
    method: 'put',
    path: '/log',
    headers: {
      'Content-Type': 'application/json',
    },
    authenticated: false,
  } as ApiConfigType,
  GET_RESUME: {
    method: 'get',
    path: '/resume/{email}',
    authenticated: false,
  } as ApiConfigType,
};
