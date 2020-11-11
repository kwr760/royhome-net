import { isEmpty } from 'lodash';
import React, { FunctionComponent } from 'react';
import { Container, Grid } from '@material-ui/core';

import { useSelector } from 'react-redux';
import Loading from '../page/loading';
import { isLoading } from '../../store/session/session.selector';
import { getUser } from '../../store/user/user.selector';

const Profile: FunctionComponent = () => {
  const user = useSelector(getUser);
  const loading = useSelector(isLoading);
  const displayLoading = loading || isEmpty(user);

  return (
    displayLoading ? <Loading />
      : (
        <Container className="mb-5">
          <Grid container className="align-items-center profile-header mb-5 text-center text-md-left">
            <Grid item md={2}>
              <img
                src={user.picture}
                alt="Profile"
                className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
              />
            </Grid>
            <Grid item md>
              <h2>{user.name}</h2>
              <p className="lead text-muted">{user.email}</p>
            </Grid>
          </Grid>
          <Grid container>
            <pre className="rounded">
              <code>
                {JSON.stringify(user, null, 2)}
              </code>
            </pre>
          </Grid>
        </Container>
      )
  );
};

export default Profile;
