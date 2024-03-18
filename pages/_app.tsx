/* eslint-disable import/order */
import { Header } from '@/components';
import { persistor, store } from '@/store';
import { AppShell, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <MantineProvider theme={theme}>
              <AppShell withBorder header={{ height: 50 }}>
                <AppShell.Header>
                  <Header />
                </AppShell.Header>
                <Component {...pageProps} />
              </AppShell>
            </MantineProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );
}
