import React from 'react'
import styled from 'styled-components'
import Dialog from 'components/Dialog'

const Div = styled.div`
		img{
			margin:72px 84px 0 126px;
			width:230px;
			height:306px;
		}
		form{
			margin-top:106px;
			float:left;
			width:603px;
			label{
				font-family: PingFangSC-Regular;
				font-size: 18px;
				color: #333333;
				display:block;
				margin-bottom:70px;
				img{
					width:14px;
					height:14px;
					margin:0 8px 0 28px;
				}
				input{
					width:335px;
					height:20px;
					background: #FFFFFF;
					border: 1px solid #979797;
					border-radius: 2px;
					margin-left:9px;
					padding:10px 0 10px 11px;
					font-size: 14px;
					color: #999999;
				}
			}
			.buildLink{
				display:block;
				width:73px;
				height:25px;
				padding:5px 27px 4px 28px;
				background: #1D8C36;
				border-radius: 4px;
				font-family: PingFangSC-Regular;
				font-size: 18px;
				color: #FFFFFF;
				float:right;
				cursor:pointer;
			}
		}
`
function Content(){
  return(
    <div>
      <div style={{float:'left'}}>
        <img src="/static/images/coverImg1.png" />
      </div>
      <form>
        <label>派单渠道名称：<input type="text"/></label>
        <label>派单渠道类型：
          <a  href="javascript:void(0)"><img src='/static/images/radio-on.png' />认证公众号</a>
          <a  href="javascript:void(0)"><img src='/static/images/radio-off.png' />非认证公众号</a>
        </label>
        <label>关注章节序号：<input type="text" placeholder="选填，如不填则使用默认设置"/></label>
        <span className="buildLink">生成链接</span>
      </form>
    </div>
  )
}
export default class Page extends React.Component{
	render(){
		return(
			<Div>
				<Dialog title="生成推广链接" content={ <Content /> } />
			</Div>
		)
	}
}
