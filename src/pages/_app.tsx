import React from 'react';
import '../styles/globals.css';
import { AuthProvider } from '@/feature/AuthProvider';
import { store } from '@/store';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#55B4B7',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={5}>
          <AuthProvider>
            <CssBaseline />
            <Head>
              <title>Shares</title>
            </Head>
            <Component {...pageProps} />
          </AuthProvider>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}
