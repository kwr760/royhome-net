// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import { useSelector } from 'react-redux';
import NavBar from './Components/NavBar/nav-bar';
import Footer from './Components/Footer/footer';
import Loading from './Components/Loading/loading';
// flowlint-next-line untyped-import:off
import PrivateRoute from './Components/PrivateRoute/private-route';
import Home from './Pages/Home/home';
import Profile from './Pages/Profile/profile';
import ResumePage from './Pages/Resume';
import HtmlResume from './Pages/HtmlResume/html-resume';

import initFontAwesome from './util/init-font-awesome';
import { isLoading } from './store/session/session.selector';

initFontAwesome();

/**
 * @return {string}
 */
const App = () => {
  const loading = useSelector((state) => isLoading(state, null));

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="app" className="d-flex flex-column h-100 backdrop">
      <NavBar />
      <Container className="flex-grow-1 pt-3 main-container">
        <Switch>
          <Route
            path="/"
            exact
            component={Home}
          />
          <PrivateRoute path="/profile" component={Profile} />
          <Route path="/staticresume" component={HtmlResume} />
          <PrivateRoute
            path="/resume"
            component={ResumePage}
            userRole="engineer"
          />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
