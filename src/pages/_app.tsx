import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }: AppProps) => {
  // assume that reddit is blocked
  // and disable client-side routing
  // which means everything is server-rendered
  const [isRedditBlocked, setIsRedditBlocked] = useState<boolean>(true);

  useEffect(() => {
    let image = new Image();
    image.src = "https://reddit.com/favicon.ico";
    image.onload = () => {
      // user can access reddit from client-side
      setIsRedditBlocked(false);
    };
  }, []);

  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Component isRedditBlocked={isRedditBlocked} {...pageProps} />
    </>
  );
};

export default App;
