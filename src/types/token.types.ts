import { Request } from 'express';
import { TOKEN_URL } from '../common/util/auth0/role.constants';

export interface TokenRequest extends Request {
  user: {
    [TOKEN_URL]: {
      role: string;
    }
  }
}
