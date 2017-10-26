import React from 'react'
import styled from 'styled-components'
import { Table, Select, Icon, Tabs, Radio } from 'antd'
const TabPane = Tabs.TabPane;

const Div = styled.div`
  margin-top:50px;
  border:1px solid #DAEAF6;
  padding:20px;
`
const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '吴彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  },
  {
    key: '3',
    name: '吴尊',
    age: 42,
    address: '北京'
  },
  {
    key: '4',
    name: '明道',
    age: 42,
    address: '北京'
  }
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  }
];
export default class Table1 extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return(
      <Div>
        <Tabs
          defaultActiveKey="1"
          tabPosition='left'
        >
          <TabPane tab="小说" key="1">
            <Table dataSource={dataSource} columns={columns}/>
          </TabPane>
          <TabPane tab="课程" key="2">课程</TabPane>
        </Tabs>
      </Div>
    )
  }
}
