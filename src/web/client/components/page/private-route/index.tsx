import React, { useEffect, FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Route, RouteComponentProps } from 'react-router-dom';

import { useAuth0 } from '../../../../util/auth0/auth0-context';
import hasNeededRole from '../../../../../common/util/auth0/has-needed-role';
import { isAuthenticated } from '../../../store/session/session.selector';
import { getUser } from '../../../store/user/user.selector';

interface Props {
  component: FunctionComponent;
  path: string;
  url?: string;
  userRole: string;
}
const PrivateRoute: FunctionComponent<RouteComponentProps> = ({
  component: Component, path, userRole = '', ...rest
}: Props) => {
  const { login } = useAuth0();
  const authenticated = useSelector((state) => isAuthenticated(state));
  const user = useSelector((state) => getUser(state));

  useEffect(() => {
    const needToLogin = async (target) => {
      if (!authenticated) {
        await login({
          appState: { targetUrl: target },
        });
      }
    };
    needToLogin(path);
  }, [authenticated, login, path]);

  const render = (props) => {
    if (authenticated === true && userRole.length > 0 && !hasNeededRole(userRole, user.context)) {
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
