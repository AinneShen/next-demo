import React from 'react';
import styled from 'styled-components';
import Head from 'next/head';

const Body = styled.body`
  background-color:#88cdea;
  img{
    display:block;
    vertical-align:middle;
    margin:0 auto;
  }
`;

export default class Error extends React.Component {
  static getInitialProps({ res, jsonPageRes }) {
    const statusCode = res
      ? res.statusCode
      : jsonPageRes ? jsonPageRes.status : null;

    var error_info = '发生错误';
    switch(statusCode){
      case 503:
        error_info = '服务不可用';
        break;
      case 404:
        error_info = '请求的网页不存在';
        break;
      case 500:
        error_info = '服务器内部错误';
        break;
    }

    return {
      statusCode: statusCode,
      error_info: error_info,
    }
  }

  render() {
    return (
      <html lang="en">
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
          <title>{this.props.statusCode}</title>
        </Head>
        <Body>
          <img src="static/images/404.jpg" />
        </Body>
      </html>
    );
  }
}
