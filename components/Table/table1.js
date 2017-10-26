import React from 'react'
import styled from 'styled-components'
import { Table, Select, Icon, Tabs, Radio } from 'antd'
const TabPane = Tabs.TabPane;

const Div = styled.div`
  margin-top:20px;
`

export default class Table1 extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      mode: 'top',
    };
  }
  handleModeChange = (e) => {
    const mode = e.target.value;
    this.setState({ mode });
  }
  render(){
    const { mode } = this.state;
    return(
      <Div>
        <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
          <Radio.Button value="top">Horizontal</Radio.Button>
          <Radio.Button value="left">Vertical</Radio.Button>
        </Radio.Group>
        <Tabs
          defaultActiveKey="1"
          tabPosition={mode}
          style={{ height: 220 }}
        >
          <TabPane tab="小说" key="1">小说</TabPane>
          <TabPane tab="课程" key="2">课程</TabPane>
        </Tabs>
      </Div>
    )
  }
}
