import React,{Component} from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Slider from 'react-slick'

const Div = styled.div`
  height:400px;
  width:1200px;
  margin:10px auto;
  .slick-slider, .slick-list, .slick-track{
    height:100%;
  }
  .slider-item{
    width:100%;
    height:100%;
    background-size:cover;
    background-position:center;
  }
  .slick-prev, .slick-next{
    width:45px;
    height:64px;
    z-index:9;
    background-size:contain;
  }
  .slick-prev{
    left:0px;
    background-image:url(/static/images/banner-prev.png);
  }
  .slick-next{
    right:0px;
    background-image:url(/static/images/banner-next.png);
  }
  .slick-prev:before, .slick-next:before{
    content: '';
  }
  .slick-dots{
    bottom:0px;
  }
  .slick-dots li button:before{
    font-size:10px;
    opacity:1;
    color:#3C3C3C;
  }
  .slick-dots li.slick-active button:before{
    color:#fff;
  }
  img{
    width:1200px;
    height:400px;
  }
`

export default class Banner extends Component{
  render(){
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
    return(
      <Div>
        <Head>
          <link rel="stylesheet" href="/static/slick/slick.css"/>
          <link rel="stylesheet" href="/static/slick/slick-theme.css"/>
        </Head>
        <Slider {...settings}>
          <div><img src="https://img.lanjinger.com/lanjingapp/default/20171012/113900_59dee3d4ef9e4.jpg" /></div>
          <div><img src="https://img.lanjinger.com/lanjingapp/default/20171012/113900_59dee3d4ef9e4.jpg" /></div>
          <div><img src="https://img.lanjinger.com/lanjingapp/default/20171012/113900_59dee3d4ef9e4.jpg" /></div>
          <div><img src="https://img.lanjinger.com/lanjingapp/default/20171012/113900_59dee3d4ef9e4.jpg" /></div>
          <div><img src="https://img.lanjinger.com/lanjingapp/default/20171012/113900_59dee3d4ef9e4.jpg" /></div>
        </Slider>
      </Div>
    )
  }
}
