import '../styles/globals.css';
import Layout from '../components/Layout';
import Head from 'next/head';
import { useEffect } from 'react';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  useEffect(() => {
    // Override fetch to log requests
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      console.log('Fetch request:', args[0], args[1]);
      return originalFetch.apply(this, args);
    };

    // Override XMLHttpRequest to log requests
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, ...rest) {
      console.log('XMLHttpRequest:', method, url);
      return originalOpen.call(this, method, url, ...rest);
    };

    // Log when the page is about to unload (which happens on refresh)
    window.addEventListener('beforeunload', () => {
      console.log('Page is refreshing/reloading');
    });

    // Log navigation events
    window.addEventListener('popstate', () => {
      console.log('Navigation: popstate');
    });

    // Log pushstate/replacestate
    const originalPushState = history.pushState;
    history.pushState = function(...args) {
      console.log('History pushState:', args[2]);
      return originalPushState.apply(this, args);
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function(...args) {
      console.log('History replaceState:', args[2]);
      return originalReplaceState.apply(this, args);
    };

  }, []);

  return (
    <SessionProvider session={session}>
      <Head>
        <title>WhyteOwl | Wheels & Bodywork Catalog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <SpeedInsights />
      <Analytics />
    </SessionProvider>
  );
}

export default MyApp;
