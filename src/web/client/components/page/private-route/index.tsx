import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';

import hasNeededRole from '../../../../../common/util/auth0/has-needed-role';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';

interface Props {
  component: FunctionComponent;
  path: string;
  url?: string;
  userRole?: string;
}
const PrivateRoute: FunctionComponent<Props> = ({
  component: Component, path, userRole = '', ...rest
}) => {
  const authenticated = useSelector((state) => isAuthenticated(state));
  const user = useSelector((state) => getUser(state));

  const render = (props) => {
    if (userRole.length > 0 && (!hasNeededRole(userRole, user.context) || authenticated === false)) {
      return (
        <h3>
          {`Unauthorized - You need the following role to view this page: ${userRole}`}
        </h3>
      );
    }

    return <Component {...props} />;
  };

  return <Route path={path} render={render} {...rest} />;
};

export default PrivateRoute;
