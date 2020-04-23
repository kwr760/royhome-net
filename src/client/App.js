// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import { useSelector } from 'react-redux';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Loading from './Components/Loading/Loading';
import Home from './Pages/Home/Home';
// flowlint-next-line untyped-import:off
import HtmlResume from './Pages/HtmlResume/HtmlResume';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Profile from './Pages/Profile/Profile';
import Resume from './Pages/Resume/Resume';

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
            component={Resume}
            userRole="engineer"
          />
        </Switch>
      </Container>
      <Footer />
    </div>
  );
};

export default App;
