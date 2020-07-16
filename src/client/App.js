// @flow

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import { useSelector } from 'react-redux';
import NavBar from './components/page/nav-bar';
import Footer from './components/page/footer';
import Loading from './components/page/loading';
import PrivateRoute from './components/page/private-route';
import AboutPage from './components/about';
import AuthorPage from './components/author';
import PrivacyPage from './components/privacy';
import TicTacToePage from './components/tictactoe';
import ProfilePage from './components/profile';
import ResumePage from './components/resume';

import initFontAwesome from './util/init-font-awesome';
import { isLoading } from './store/session/session.selector';

initFontAwesome();

/**
 * @return {string}
 */
const App = () => {
  const loading = useSelector((state) => isLoading(state, null));

  return (
    <>
      { loading ? <Loading /> : null }
      <div id="app" className="d-flex flex-column h-100 backdrop">
        <NavBar />
        <Container className="flex-grow-1 pt-3 main-container">
          <Switch>
            <Route
              path="/"
              exact
              component={ResumePage}
            />
            <Route path="/about" component={AboutPage} />
            <Route path="/author" component={AuthorPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <PrivateRoute
              path="/tictactoe"
              component={TicTacToePage}
              userRole="engineer"
            />
            <PrivateRoute path="/profile" component={ProfilePage} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default App;
