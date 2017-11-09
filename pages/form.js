import React from 'react'
import RegistForm from 'components/RegistForm'
import styled from 'styled-components'

const Div = styled.div`
  width:370px;
  height:434px;
  margin:50px auto;
`

export default class Index extends React.Component{
  render(){
    return(
      <Div>
        <RegistForm />
      </Div>
    )
  }
}
