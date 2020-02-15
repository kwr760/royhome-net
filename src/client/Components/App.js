import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import NavBar from './NavBar/NavBar';
import Footer from './Footer/Footer';
import Loading from './Loading/Loading';
import Home from '../Pages/Home/Home';
import Resume from '../Pages/Resume/Resume';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Profile from '../Pages/Profile/Profile';
import Courses from '../Pages/Courses/Courses';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { useAuth0 } from '../../util/auth0/context';
import initFontAwesome from '../util/initFontAwesome';

initFontAwesome();

/**
 * @return {string}
 */
function App({ context }) {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100">
      <NavBar />
      <Container className="flex-grow-1 mt-3">
        <Switch>
          <Route
            path="/"
            exact
            component={Home}
          />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/resume" component={Resume} />
          <PrivateRoute
            path="/courses"
            component={Courses}
            userRole="engineer"
            context={context}
          />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
}

App.propTypes = {
  context: PropTypes.shape({
    jwt: PropTypes.shape({
      expiresAt: PropTypes.number,
      data: PropTypes.shape(),
    }),
    data: PropTypes.shape(),
  }),
};

App.defaultProps = {
  context: {},
};

export default App;
