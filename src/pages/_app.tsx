import '@/styles/globals.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { AppProps } from 'next/app';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { AuthProvider } from '@/feature/auth/authProvider';

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
