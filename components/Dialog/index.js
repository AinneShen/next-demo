import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
	width:100%;
	height:100%;
	background: rgba(0,0,0,0.50);
	position:fixed;
	top:0;
	left:0;
	.modal{
		width:1043px;
		height:502px;
		background:#fff;
		position:absolute;
		top:50%;
		left:50%;
		margin-top:-282px;
		margin-left:-560px;
		padding:30px 41px 31px 36px;
		.modal-head{
			border-bottom:1px solid #979797;
			position:relative;
			padding-bottom:18px;
      height:33px;
			span{
				font-family: PingFangSC-Medium;
				font-size: 24px;
				color: #333333;
				line-height:33px;
			}
			img{
        width:36px;
        height:36px;
        margin:0;
				position:absolute;
				top:0;
				right:0;
				cursor:pointer;
			}
		}
	}
`

export default class Dialog extends React.Component{
  constructor(props){
    console.log(props);
    super(props);
  }
  render(){
		return(
			<Div>
				<div className="modal">
					<div className="modal-head">
						<span>{this.props.title}</span>
						<img src="/static/images/close-dialog.png" />
					</div>
					<div className="modal-content">
            {this.props.content}
          </div>
				</div>
			</Div>
		)
	}
}
