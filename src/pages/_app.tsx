import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", url => {
  console.log("url", url);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  console.log("complete");
  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
