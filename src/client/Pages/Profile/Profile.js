// @flow

import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import { useSelector } from 'react-redux';
import Loading from '../../Components/Loading/Loading';
import { useAuth0 } from '../../../util/auth0/context';
import { isLoading } from '../../store/session/session.selector';

const Profile = () => {
  const { user } = useAuth0();
  const loading = useSelector((state) => isLoading(state, null));

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.name}</h2>
          <p className="lead text-muted">{user.email}</p>
        </Col>
      </Row>
      <Row>
        <pre className="rounded">
          <code>
            {JSON.stringify(user, null, 2)}
          </code>
        </pre>
      </Row>
    </Container>
  );
};

export default Profile;
