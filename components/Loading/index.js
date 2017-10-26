import React from 'react'
import { Button, Spin, Alert, Switch } from 'antd'
import styled from 'styled-components'

const Div = styled.div`
  .box3{
    width:400px;
    height:200px;
    position:relative;
    background:#ecf6fd;
    .ant-spin{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
    }
  }
`

export default class Index extends React.Component{
  constructor(){
    super()
    this.state = {
      loading:false
    }
  }
  handleLoading(){
    this.setState({
      loading:!this.state.loading
    })
  }
  render(){
    return(
      <Div>
        <Button type="primary" loading={this.state.loading} onClick={this.handleLoading.bind(this)}>Loding...</Button>
        <Switch onChange={this.handleLoading.bind(this)} />
        <Spin tip="Loading..." spinning={this.state.loading}>
          <Alert
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
        </Spin>
        <Spin tip="Loading..." spinning={this.state.loading}>
          <div style={{width:'400px',height:'200px',background:'#ecf6fd'}}></div>
        </Spin>
        <div className="box3" >
          <Spin spinning={this.state.loading} tip="请稍候。。。" />
        </div>
      </Div>
    )
  }
}
