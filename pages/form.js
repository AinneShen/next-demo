import React from 'react'
import styled from 'styled-components'

const Div = styled.div`

`

export default class Form extends React.Component{
  constructor(){
    super();
    this.state = {
      userName:"",
      id:"",
      text:""
    }
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeId = this.handleChangeId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
  }
  handleChangeName(e){
    console.log(e.target.value);
    this.setState({
      userName:e.target.value
    })
  }
  handleChangeId(e){
    this.setState({
      id:e.target.value
    })
  }
  handleSubmit(e){
    console.log(this.state);
    e.preventDefault();
  }
  handleChangeText(e){
    this.setState({
      text:e.target.value
    })
  }
  render(){
    return(
      <Div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>userName<input type="text" name="user" value={this.state.userName} onChange={this.handleChangeName}/></label>
          </div>
          <div>
            <label>ID<input type="text" name="id" value={this.state.id} onChange={this.handleChangeId}/></label>
          </div>
          <div>
            <textarea value={this.state.text} onChange={this.handleChangeText}>
            </textarea>
          </div>
          <div>
            <input type="submit" value="submit" />
          </div>
        </form>
      </Div>
    )
  }
}
