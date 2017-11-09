import React from 'react'
import SelfForm from 'components/RegistForm/index1'
import styled from 'styled-components'

const Div = styled.div`
  width:800px;
  height:434px;
  margin:50px auto;
`

export default class Index extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      navActive: "个人中心",
      IP:['47.194.232.34','14.325.23.121','135.54.461.23','25.879.862.101'],
      renzheng:true,
    }
    this.changeRenzheng = this.changeRenzheng.bind(this);
  }
  changeRenzheng(){
    this.setState({
      renzheng:!this.state.renzheng
    })
  }
  render(){
    return(
      <Div>
        <SelfForm {...this.state} changeRenzheng={this.changeRenzheng} />
      </Div>
    )
  }
}
