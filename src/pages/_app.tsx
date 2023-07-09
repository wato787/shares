import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import { AuthProvider } from '@/feature/auth/AuthProvider';
import { store } from '@/store';
import { ThemeProvider } from '@emotion/react';
import { createTheme, CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import LoadingScreen from '@/components/templates/LoadingScreen';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const [showLoading, setShowLoading] = useState(true); // ローディング画面の表示状態

  // ページがマウントされた後、1秒後にローディング画面を非表示にする
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(85,180,183, 1)',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <CssBaseline />
          {showLoading ? (
            <LoadingScreen />
          ) : (
            // コンポーネントを表示
            <Component {...pageProps} />
          )}
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  );
}
