import React from 'react'
import { Button, Steps } from 'antd'
import styled from 'styled-components'
const Step = Steps.Step

const Div = styled.div`
  margin-top:50px;
  button{
    margin:50px;
  }
`

export default class Index extends React.Component{
  constructor(){
    super()
    this.state = {
      current:0
    }
  }
  handleNextStep(){
    if(this.state.current<2){
      this.setState({
        current:this.state.current+1
      })
    }
  }
  handlePrimaryStep(){
    if(this.state.current>0){
      this.setState({
        current:this.state.current-1
      })
    }
  }
  render(){
    return(
      <Div>
        <Steps  current={this.state.current}>
          <Step title="Finished" description="This is a description." />
          <Step title="In Progress" description="This is a description." />
          <Step title="Waiting" description="This is a description." />
        </Steps>
        <Button disabled={this.state.current===2?true:false} type="primary" onClick={this.handleNextStep.bind(this)}>Next</Button>
        <Button disabled={this.state.current===0?true:false} type="primary" onClick={this.handlePrimaryStep.bind(this)}>Previous</Button>
      </Div>
    )
  }
}
