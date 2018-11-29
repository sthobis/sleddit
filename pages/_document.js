import Document, { Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="description" content="Slack-styled Reddit viewer" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="og:url" content="https://sthobis.github.io/sleddit" />
          <meta property="og:site_name" content="Sleddit" />
          <meta property="og:title" content="Sleddit" />
          <meta
            property="og:description"
            content="Slack-styled Reddit viewer"
          />
          <link
            rel="icon"
            type="image/png"
            href="/static/images/icon-192x192.png"
          />
          <link
            href="https://fonts.googleapis.com/css?family=Lato:400,900"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
