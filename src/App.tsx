import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import theme from './services/theme';
import React from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Routes from './views/Routes';

const queryClient = new QueryClient();

setLogger({
  log: console.log,
  warn: console.log,
  error: console.log
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Routes />
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
