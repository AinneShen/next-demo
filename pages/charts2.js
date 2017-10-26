import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Highcharts from 'highcharts'
import Helmet from 'react-helmet'

const Div = styled.div`
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
  .data-filter-wrap{
    .data-filter-btn{
      display:inline-block;
      font-size: 16px;
      color: #666;
      line-height:36px;
      background: #ededed;
      padding:0 35px;
      cursor:pointer;
    }
    .data-filter-btn-active, .data-filter-btn:hover{
      background: #F55200;
      color: #FFFFFF;
    }
  }
`;

class Index extends React.Component {
  static async getInitialProps ({ isServer, req, res, query, asPath }) {

    return {
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      showFilter: false,
      navActive: "分销中心",
    }

    this.chartOptions = {
      credits: {
        enabled: false
      },
      chart:{
        backgroundColor: '#00577a',
        // plotBackgroundColor:'#00577a',
        spacingTop: 40,
      },
      title: {
          text: ''
      },

      subtitle: {
          text: ''
      },
      xAxis: {
        type: "datetime",
        title: {
            text: ''
        },
        lineColor: 'transparent',
        labels: {
          enable: false,
          rotation: 0,
          formatter: function() {
            return ('<span style="font-size:12px; color:#999;">' + Highcharts.dateFormat('%Y/%m/%d', this.value) + '</span>');
          },
        },
      },
      yAxis: {
        showFirstLabel: false,
        title: {
            text: ''
        },
        lineColor: 'transparent',
        labels: {
          style: {
            color: '#999',
            fontSize: '12px',
          },
        },

      },
      legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'top',
        itemDistance: 50,
        itemStyle: {
          color: '#fff',
          fontSize: '14px',
        },
        itemHoverStyle: {
          color: '#ddd',
        },
        symbolWidth: 40,
      },
      plotOptions: {
        series: {
          label: {
              connectorAllowed: false
          },
        }
      },
      responsive: {
        rules: [{
          condition: {
              maxWidth: 500
          },
          chartOptions: {
              legend: {
                  layout: 'horizontal',
                  align: 'center',
                  verticalAlign: 'bottom'
              }
          }
        }]
      }
    }

  }

  componentDidMount() {
    Highcharts.setOptions({
      global: {
        useUTC: true
      },
      lang: {
          months: ['1月', '2月', '3月', '4月','5月', '6月', '7月', '8月','9月', '10月', '11月', '12月'],
          weekdays: ['星期日', '星期一', '星期二', '星期三','星期四', '星期五', '星期六'],
          resetZoom: '还原',
          resetZoom: '恢复缩放',
          shortMonths: ['1 -', '2 -', '3 -', '4 -','5 -', '6 -', '7 -', '8 -','9 -', '10 -', '11 -', '12 -'],
      },
    });
    window.chart = Highcharts.chart('charts-wrap', {
      ...this.chartOptions,
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
      });

      var xAxis = chart.xAxis[0],
          yAxis = chart.yAxis[0],
          top = chart.plotTop + yAxis.height,
          width = chart.chartWidth;

      chart.renderer
        .rect(0/*position on X-axis*/, top/*position on Y-axis*/, width/*width*/ , 41/*height*/, 0)
        .attr({
          'stroke-width': 0,
          stroke: '#fff',
          fill: '#fff',
          zIndex: 3
        })
        .add();
      chart.renderer
        .rect(0/*position on X-axis*/, 0/*position on Y-axis*/, 40/*width*/ , top/*height*/, 0)
        .attr({
          'stroke-width': 0,
          stroke: '#fff',
          fill: '#fff',
          zIndex: 3
        })
        .add();
  }

  render () {
    return (
      <Div>
          <div id="charts-wrap"></div>
      </Div>
    )
  }
}

export default Index
