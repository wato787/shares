import '@/styles/globals.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { configureStore } from '@reduxjs/toolkit';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  const store = configureStore({
    reducer: {
      // counter: counterReducer,
    },
  });

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}
