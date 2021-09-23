import { createMuiTheme, unstable_createMuiStrictModeTheme, responsiveFontSizes } from '@material-ui/core/styles';

const createTheme = process.env.NODE_ENV === 'production' ? createMuiTheme : unstable_createMuiStrictModeTheme;

const theme = createTheme({
  palette: {
    primary: {
      main: '#344955'
    },
    secondary: {
      main: '#F9AA33'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto'
        }
      }
    },
    MuiButton: {
      root: {
        textTransform: 'none'
      }
    }
  }
});

export default responsiveFontSizes(theme);
