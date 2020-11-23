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
      light: '#fbf3e7',
      main: '#c8c0b5',
      dark: '#454d50',
    },
    secondary: {
      light: '#979085',
      main: '#fbf3e7',
      dark: '#fff6ed',
    },
    background: {
      paper: '#70797c',
      default: '#9ea8ab',
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
