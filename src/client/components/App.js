import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';

import NavBar from './Pages/NavBar';
import Footer from './Pages/Footer';
import Loading from './Loading';
import Home from './Pages/Public/Home';
import Resume from './Pages/Public/Resume';
import PrivateRoute from './Pages/PrivateRoute';
import Profile from './Pages/Private/Profile';
import Private from './Pages/Private/Private';
import Courses from './Pages/Private/Courses';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import { useAuth0 } from '../../util/auth0/context';
import initFontAwesome from './initFontAwesome';

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
          <PrivateRoute path="/private" component={Private} context={context} />
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
