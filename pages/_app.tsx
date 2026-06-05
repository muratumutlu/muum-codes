/* eslint-disable import/order */
import { Header } from '@/components';
import { persistor, store } from '@/store';
import { clerkPublishableKey, isClerkConfigured } from '@/utils/auth';
import { ClerkProvider } from '@clerk/clerk-react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './globals.css';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  const app = (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={pageProps.dehydratedState}>
            <MantineProvider theme={theme}>
              <Header />
              <Component {...pageProps} />
            </MantineProvider>
          </HydrationBoundary>
        </QueryClientProvider>
      </PersistGate>
    </ReduxProvider>
  );

  if (!isClerkConfigured) return app;

  return (
    <ClerkProvider
      publishableKey={clerkPublishableKey as string}
      {...pageProps}
    >
      {app}
    </ClerkProvider>
  );
}
