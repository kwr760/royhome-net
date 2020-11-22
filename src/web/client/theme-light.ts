import { createMuiTheme } from '@material-ui/core/styles';

interface CustomOptions {
  boxShadow?: string;
  backgroundGradient?: string;
}
interface Custom {
  boxShadow?: string;
  backgroundGradient?: string;
}
declare module '@material-ui/core/styles/createMuiTheme' {
  interface ThemeOptions {
    custom?: CustomOptions;
  }
  interface Theme {
    custom: Custom;
  }
}

const themeLight = createMuiTheme({
  palette: {
    primary: {
      // light: '#9ea8ab',
      // main: '#70797c',
      // dark: '#454d50',
      light: '#828fa4',
      main: '#556275',
      dark: '#2b3849',
    },
    secondary: {
      // light: '#fbf3e7',
      // main: '#c8c0b5',
      // dark: '#979085',
      light: '#e1ccaa',
      main: '#af9b7b',
      dark: '#816f50',
    },
    background: {
      paper: '#fff6ed',
      default: '#fff2e4',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif',
    fontSize: 14,
  },
  custom: {
    backgroundGradient: 'linear-gradient(to bottom right, #191F27, #556275)',
    boxShadow: '0 0 4px 1px #af9b7b',
  },
});

export default themeLight;
