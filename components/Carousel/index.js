import React from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'

const Div = styled.div`
  .ant-carousel .slick-slide {
    text-align: center;
    width:660px;
    height: 160px;
    line-height: 160px;
    background: #364d79;
    overflow: hidden;
    color: #fff;
  }

  .ant-carousel{
    margin:50px;
    width:660px;
    height:160px;
    overflow:hidden;
  }
`

export default class Index extends React.Component{
  render(){
    return(
      <Div>
        <Carousel>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Carousel>
        <Carousel vertical autoplay>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Carousel>
      </Div>
    )
  }
}
