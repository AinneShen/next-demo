import React,{Component} from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import Slider from 'react-slick'

const Div = styled.div`
  height:340px;
  width:790px;
  margin:10px auto;
  .slick-slider, .slick-list, .slick-track{
    height:100%;
  }
`
const banners = [
  {
    title: '12.12家电开枪提前引爆',
    img: '//img13.360buyimg.com/da/jfs/t12304/184/1391501275/140346/4786031c/5a1f657dNc231694d.jpg',
    url:'https://www.baidu.com',
  },
  {
    title: '狂欢在即 好纸相邀',
    img: '//img1.360buyimg.com/da/jfs/t13732/1/1335108195/56481/690e472b/5a1e6f41Nc4e4cbdf.jpg',
    url:'https://www.baidu.com',
  },
  {
    title: '1206-清洁双12',
    img: '//img12.360buyimg.com/babel/jfs/t16408/362/44004002/174282/7218c3f/5a264b49Nea3c58ce.jpg',
    url:'https://www.baidu.com',
  },
  {
    title: '暖冬蒸海味',
    img: '//img11.360buyimg.com/babel/jfs/t12538/241/1651969216/86546/fc8db6d2/5a250402Naefe628a.jpg',
    url:'https://www.baidu.com',
  },
]
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
            {banners.map((item,index)=>{
              return (
                <div key={index}>
                  <a target="_blank" href={item.url}>
                    <img src={item.img}/>
                  </a>
                </div>
              )
            })}
          </Slider>
      </Div>
    )
  }
}
