import React from 'react'
import styled from 'styled-components'
import { BackTop } from 'antd'

const Div = styled.div`
  width:25px;
  height:41px;
`

export default class Index extends React.Component{
  render(){
    return(
      <Div>
        <BackTop>
          <img src="/static/images/rocket.png" />
        </BackTop>
      </Div>
    )
  }
}
