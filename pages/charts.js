import React from 'react'
import ReactHighcharts from 'react-highcharts'
import styled from 'styled-components'
import Head from 'next/head'
import Helmet from 'react-helmet'

const Div = styled.div`
  .highcharts-grid-line{
    color:#fff;
    opacity:0.1;
  }
  #charts-wrap{
      height:495px;
      margin:30px auto;
  }

  .highcharts-grid-line{
      color:#fff;
      opacity:0.1;
    }
    .highcharts-tick{
      display:none;
    }
    .he{
      color:red
    }
`
const config = {
  chart:{
    height:495,
    plotBackgroundColor: '#006285',
    marginTop: 0
  },
  legend:{
    layout: 'horizontal',
    align: 'center',
    verticalAlign: 'top',
    itemDistance: 70,
    itemStyle: {
      color: '#fff',
      fontSize: '14px',
    },
    itemHoverStyle: {
      color: '#ddd',
    },
    symbolWidth: 40,
  },
  credits:{
    enabled:false
  },
  title:{
    text:''
  },
  xAxis: {
    labels:{
      formatter: function() {
            return ('<span style="font-size:12px; color:#999;">' + ReactHighcharts.Highcharts.dateFormat('%Y/%m/%d', this.value) + '</span>');
          },
    },
    title: {
        text:''
    },
    lineColor:'transparent'
  },
  yAxis: {
    labels:{
      style:{
        color:'#999'
      }
    },
      showLastLabel: false,
      title: {
          text: ''
      }
  },
  plotOptions: {
      series: {
          label: {
              connectorAllowed: false
          },
          pointStart: 2015
      }
  },
  series: [{
          name: '课程',
          color: '#24F2D2',
          marker: {
            enabled: true,
            symbol: 'circle',
          },
          data: [
            [Date.UTC(2013,5,2),2695],
            [Date.UTC(2013,5,3),7648],
            [Date.UTC(2013,5,4),3645],
            [Date.UTC(2013,5,5),8638],
            [Date.UTC(2013,5,6),3549],
            [Date.UTC(2013,5,7),6562],
            [Date.UTC(2013,5,9),9574],
          ]
      }, {
          name: '小说',
          color: '#F2C024',
          marker: {
            enabled: true,
            symbol: 'circle',
          },
          data: [
            [Date.UTC(2013,5,2),4453],
            [Date.UTC(2013,5,3),2233],
            [Date.UTC(2013,5,4),4532],
            [Date.UTC(2013,5,5),9876],
            [Date.UTC(2013,5,6),9843],
            [Date.UTC(2013,5,7),2211],
            [Date.UTC(2013,5,9),1223],
          ]
      }, {
          name: '微商',
          color: '#AEF224',
          marker: {
            enabled: true,
            symbol: 'circle',
          },
          data: [
            [Date.UTC(2013,5,2),1122],
            [Date.UTC(2013,5,3),2343],
            [Date.UTC(2013,5,4),3333],
            [Date.UTC(2013,5,5),3322],
            [Date.UTC(2013,5,6),4534],
            [Date.UTC(2013,5,7),4564],
            [Date.UTC(2013,5,9),6786],
          ]
      }, {
          name: '品牌曝光',
          color: '#F22484',
          marker: {
            enabled: true,
            symbol: 'circle',
          },
          data: [
            [Date.UTC(2013,5,2),1232],
            [Date.UTC(2013,5,3),7648],
            [Date.UTC(2013,5,4),7662],
            [Date.UTC(2013,5,5),9824],
            [Date.UTC(2013,5,6),3333],
            [Date.UTC(2013,5,7),7562],
            [Date.UTC(2013,5,9),2222],
          ]
      }]
}

class He extends React.Component{
  render(){
    return(
      <h1 class="he">123</h1>
    )
  }
}
export default class Charts extends React.Component{
  static async getInitialProps({req}) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent }
  }

  constructor(props){
    super(props);
  }
  render(){
    return(
      <Div>
      <Helmet>
        <link rel="stylesheet" href="/static/css/charts.css"/>
      </Helmet>
        <He />
        Hello World {this.props.userAgent}
        <ReactHighcharts domProps = {{id: 'charts-wrap'}} /*callback={afterRender}*/ config = {config} />
      </Div>
    )
  }
}
