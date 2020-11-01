import { LoadableComponent } from '@loadable/component';
import React, { ElementType, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import hasNeededRole from '../../../../../common/util/auth0/has-needed-role';
import { UserStateType } from '../../../../types/state.types';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';

interface PrivateRouteProps {
  component: FunctionComponent | LoadableComponent<unknown> | ElementType;
  path: string;
  url?: string;
  userRole?: string;
}

const PrivateRoute: FunctionComponent<PrivateRouteProps> = ({
  component: Component, path, userRole = '', ...rest
}) => {
  const authenticated = useSelector(isAuthenticated);
  const user: UserStateType = useSelector(getUser);

  return (
    <Route
      path={path}
      {...rest}
      render={props => (userRole.length > 0 && (!hasNeededRole(userRole, user.context) || !authenticated)) ?
        <h3>{`Unauthorized - You need the following role to view this page: ${userRole}`}</h3> :
        <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
