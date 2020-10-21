import React, { FunctionComponent } from 'react';
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

import { isLoading, getDarkMode } from './store/session/session.selector';
import { DarkModes } from './store/session/session.constants';

/**
 * @return {string}
 */
const App: FunctionComponent = () => {
  const loading = useSelector((state) => isLoading(state));
  const darkMode = useSelector((state) => getDarkMode(state));

  let appClasses = 'd-flex flex-column h-100 backdrop';
  if (darkMode === DarkModes.DARK_MODE) {
    appClasses += ' dark-theme';
  } else if (darkMode === DarkModes.LIGHT_MODE) {
    appClasses += ' light-theme';
  }

  return (
    <>
      { loading ? <Loading /> : null }
      <div id="app" className={appClasses}>
        <a className="skip-link" href="#main"><div className="sr-only">Skip to main</div></a>
        <NavBar />
        <Container id="main" className="flex-grow-1 pt-3 main-container overflow-auto">
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
