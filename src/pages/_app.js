import { ChakraProvider } from '@chakra-ui/react';
import Head from 'next/head';
import theme from '../theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
        <Head>
            <link rel="icon" href="/favicon.ico?v=1.2" />
            <title>Predawn</title>
        </Head>
        <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;