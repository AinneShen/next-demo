import React from 'react'
import styled from 'styled-components'
import { Table, Select, Icon } from 'antd'
import Head from 'next/head'
import Table2 from 'components/Table/table2'
import Rocket from 'components/BackTop'
import Carousel from 'components/Carousel'
import Loading from 'components/Loading'
import Steps from 'components/Steps'

const Option = Select.Option;
const opts = ['成熟','有钱','有颜','温柔','体贴'];
const children=[];
for(let i=0;i<opts.length;i++){
  children.push(<Option key={opts[i]}>{opts[i]}</Option>);
}

const Div = styled.div`
  width:80%;
  margin:0 auto;
  padding-bottom:200px;
  table{
    padding:12px 10px;
  }
  .ant-table-thead th{
    background: #DAEAF6;
  }
  .ant-table-tbody{
    tr:nth-child(even){
      background: #FCFCFC;
    }
  }
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
    key: 'name',
    render:(text,record)=>(
      <div>
        <p>{text}</p>
        <p>{record.age}</p>
      </div>
    )
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    dataIndex: 'label',
    key: 'label',
    render:()=>(
      <Select defaultValue={opts[0]} style={{width:'100px'}}>
        {children}
      </Select>
    )
  }
];

export default class Demo extends React.Component{
  handleChange(v){
    console.log(v);
  }
  render(){
    return(
      <Div>
        <Head>
          <title>antd</title>
          <link rel="stylesheet" href="/static/dist/antd.min.css" />
        </Head>
        <Table dataSource={dataSource} columns={columns} />
        <Select defaultValue={opts[0]} style={{width:'100px'}} onChange={this.handleChange.bind(this)}>
          {children}
        </Select>
        <Select showSearch defaultValue={opts[0]} style={{width:'100px'}} onChange={this.handleChange.bind(this)}>
          {children}
        </Select>
        <Select mode='multiple' defaultValue={opts[0]} style={{width:'200px'}} onChange={this.handleChange.bind(this)}>
          {children}
        </Select>
        <Table2 />
        <Rocket />
        <Carousel />
        <Loading />
        <Steps />
      </Div>
    )
  }
}
