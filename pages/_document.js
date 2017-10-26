import Document, { Head, Main, NextScript } from 'next/document';
import Helmet from 'react-helmet';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(...args) {
    const documentProps = await super.getInitialProps(...args);
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    // const { req } = {...args};

    return { ...documentProps, helmet: Helmet.rewind() };
  }

  // should render on <html>
  helmetHtmlAttrComponents() {
    return this.props.helmet.htmlAttributes.toComponent();
  }

  // should render on <head>
  helmetHeadComponents() {
    const keys = Object.keys(this.props.helmet)
      .filter(el => el !== 'htmlAttributes')
      .map(el => this.props.helmet[el].toComponent())
      .filter(
        el =>
          el.length > 0 ||
          !(Object.keys(el).length === 0 && el.constructor === Object)
      );

    return keys.length ? keys : [];
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleElement();
    const devScript = [];
    if(process.env.SHOW_DEBUG_TOOL){
      devScript.push(
        <script key={0} src="//cdn.jsdelivr.net/eruda/1.2.2/eruda.min.js" />
      );
      devScript.push(<script key={1} >eruda.init();</script>);
    }
    return (
      <html lang="en" {...this.helmetHtmlAttrComponents()}>
        <Head>
          <meta name="referrer" content="always" />
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1, maximum-scale=1, user-scalable=no" />
          <meta name="keywords" content="" />
          <meta name="description" content="" />
          <link
            rel="shortcut icon"
            href="http://static.lanjinger.com/statics/favicon.ico"
            type="image/x-icon"
          />
          <link rel="stylesheet" href="/static/css/nprogress.css" />
          {devScript}
          {this.helmetHeadComponents()}
          {styleTags}
        </Head>
        <body>
          <div className="root">
            {main}
          </div>

          {/*<script src="/public/scripts/jquery.cookie.js" />*/}
          <NextScript />
        </body>
      </html>
    );
  }
}
