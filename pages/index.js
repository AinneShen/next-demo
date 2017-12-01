import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Charts from './charts'
import Head from 'next/head'
import Helmet from 'react-helmet'
import Banner from 'components/Banner'
import NProgress from 'nprogress'
import Router from 'next/router'
import ActiveLink from './withRouter'
import Dialog from 'components/Dialog'

Router.onRouteChangeStart= (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
}
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()


const Div = styled.div`
  width:800px;
  margin:100px auto;
`

export default class Index extends React.Component{

  render(){
    return (
      <Div>
        <div dangerouslySetInnerHTML={{__html:'<h1>123</h1>'}}></div>
        <ul>
          <li>
            <Link href="/profit/detail" >
              <a onMouseEnter={() => {Router.prefetch('/profit/detail');console.log("prefetching /about!");}}>轮播图</a>
            </Link>
          </li>
          <li>
            <Link href="/charts" replace>
              <a onMouseEnter={() => {Router.prefetch('/charts');console.log("prefetching /charts!");}}>图表</a>
            </Link>
          </li>
          <li>
            <Link  prefetch href={{ pathname: '/logProps', query: { name: 'test'}, asPath:'/log'}}>
              <a>查看getInitialProps的参数</a>
            </Link>
          </li>
          <li onClick={()=>{Router.push("/logProps","/log",{ shallow:true})}}>logProps</li>
          <li onClick={()=>{Router.push("/charts?id=1","/c",{ shallow:true})}}>charts</li>
          <li><ActiveLink href="/about">About</ActiveLink></li>
          <li>
            <Link href="/form"><a>表单</a></Link>
          </li>
          <li>
            <Link href="/selfForm"><a>自写表单</a></Link>
          </li>
          <li>
            <Link href="/dialog">
              <a>模态框</a>
            </Link>
          </li>
          <li>
            <Link href="/product">
              <a>商品列表</a>
            </Link>
          </li>
          <li>
            <Link href="/productDemo">
              <a>商品列表案例</a>
            </Link>
          </li>
          <li>
            <Link href="/antd">
              <a>antd</a>
            </Link>
          </li>
        </ul>
      </Div>
    )
  }
}
