import { makeStyles } from '@material-ui/core/styles';
import React, { FunctionComponent } from 'react';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import { Container, createStyles, Theme } from '@material-ui/core';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';

import NavBar from './components/page/app-bar';
import Footer from './components/page/footer';
import Loading from './components/page/loading';
import PrivateRoute from './components/page/private-route';
import ResumePage from './components/resume';

import { isLoading  } from './store/session/session.selector';
// import { DarkModes } from './store/session/session.constants';

const AboutPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/about');
const AuthorPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/author');
const PrivacyPage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/privacy');
const ProfilePage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/profile');
const TicTacToePage = /* #__LOADABLE__ */ () => import(/* webpackPrefetch: true */ './components/tictactoe');
const AboutLoadable = loadable(AboutPage, { ssr: true });
const AuthorLoadable = loadable(AuthorPage, { ssr: true });
const PrivacyLoadable = loadable(PrivacyPage, { ssr: true });
const ProfileLoadable = loadable(ProfilePage, { ssr: true });
const TicTacToeLoadable = loadable(TicTacToePage, { ssr: true });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      background: theme.palette.background.paper,
      boxShadow: theme.custom.boxShadow,
      paddingTop: '1rem',
      flexGrow: 1,
      overflow: 'auto',
    },
    app: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
    },
  }),
);

/**
 * @return {string}
 */
const App: FunctionComponent<RouteComponentProps> = () => {
  const classes = useStyles();
  const loading = useSelector(isLoading);
  // const darkMode = useSelector(getDarkMode);
  //
  // let appClasses = '';
  // if (darkMode === DarkModes.DARK_MODE) {
  //   appClasses += ' dark-theme';
  // } else if (darkMode === DarkModes.LIGHT_MODE) {
  //   appClasses += ' light-theme';
  // }

  return (
    <>
      { loading ? <Loading /> : null }
      <div id="app" className={classes.app}>
        <a href="#main"><div className="sr-only">Skip to main</div></a>
        <NavBar />
        <Container id="main" className={classes.paper}>
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
