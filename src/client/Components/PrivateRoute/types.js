// @flow

import type { ContextType } from '../../types';

export type PrivateRoutePropsType = {|
  component: Object,
  context?: ContextType,
  path: string,
  userRole?: string,
  url?: Object,
|};
