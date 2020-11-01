import React, { FunctionComponent } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import NavBar from './components/page/nav-bar';
import Footer from './components/page/footer';
import Loading from './components/page/loading';
import PrivateRoute from './components/page/private-route';
import ResumePage from './components/resume';

import { isLoading, getDarkMode } from './store/session/session.selector';
import { DarkModes } from './store/session/session.constants';

const AboutPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/about');
const AuthorPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/author');
const PrivacyPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/privacy');
const ProfilePage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/profile');
const TicTacToePage = /* #__LOADABLE__ */ () => import('./components/tictactoe');
const AboutLoadable = loadable(AboutPage, { ssr: true });
const AuthorLoadable = loadable(AuthorPage, { ssr: true });
const PrivacyLoadable = loadable(PrivacyPage, { ssr: true });
const ProfileLoadable = loadable(ProfilePage, { ssr: true });
const TicTacToeLoadable = loadable(TicTacToePage, { ssr: true });

/**
 * @return {string}
 */
const App: FunctionComponent<RouteComponentProps> = () => {
  const loading = useSelector(isLoading);
  const darkMode = useSelector(getDarkMode);

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
            <Route path="/about" component={AboutLoadable} />
            <Route path="/author" component={AuthorLoadable} />
            <Route path="/privacy" component={PrivacyLoadable} />
            <PrivateRoute
              path="/tictactoe"
              component={TicTacToeLoadable}
              userRole="engineer"
            />
            <PrivateRoute path="/profile" component={ProfileLoadable} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default App;
