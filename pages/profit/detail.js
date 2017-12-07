import React from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import Banner from 'components/Banner'
import Banner2 from 'components/Banner/index2'

const Div = styled.div`
  width:1200px;
  margin:0 auto;
`

export default class Index extends React.Component{
  render(){
    return (
      <Div>
        <Head>
          <title>我的收益</title>
          <link rel="shortcut icon" href="http://static.lanjinger.com/statics/favicon.ico" type="image/x-icon"/>
          <link rel="stylesheet" href="/static/slick/slick.css"/>
          <link rel="stylesheet" href="/static/slick/slick-theme.css"/>
        </Head>
        <Banner />
        <Banner2 />
      </Div>
    )
  }
}
