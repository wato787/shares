import { AuthProvider } from '@/feature/auth/AuthProvider';
import { store } from '@/store';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <CssBaseline />
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}
