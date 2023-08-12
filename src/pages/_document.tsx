import { Html, Main, NextScript } from 'next/document';
import Head from 'next/head';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <title>Shares</title>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          key='title'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
