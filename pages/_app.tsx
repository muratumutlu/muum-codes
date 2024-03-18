/* eslint-disable import/order */
import { Header } from '@/components';
import { store } from '@/store';
import { AppShell, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <MantineProvider theme={theme}>
            <Head>
              <title>Github Explorer</title>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
              />
              <link rel="shortcut icon" href="/favicon.svg" />
            </Head>
            <AppShell withBorder header={{ height: 50 }}>
              <AppShell.Header>
                <Header />
              </AppShell.Header>
              <Component {...pageProps} />
            </AppShell>
          </MantineProvider>
        </HydrationBoundary>
      </QueryClientProvider>
    </ReduxProvider>
  );
}
