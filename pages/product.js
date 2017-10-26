import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
  .stocked{
    color:red
  }
`
class ProductRow extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
      <tr>
        <td className={`${this.props.stocked?'':'stocked'}`}>{this.props.name}</td>
        <td>{this.props.price}</td>
      </tr>
    )
  }
}

class ProductCategoryRow extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
  }
  render(){
    return(
      <tr style={{fontWeight:700}}>
        <th colSpan="2">{this.props.category}</th>
      </tr>
    )
  }
}

class ProductTable extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    var row=[],cate=[];
    this.props.products.forEach(function(product){
      var category = product.category;
      var productTem = {};
      for(var key in product){
        productTem[key]=product[key]
      }
      if(!row[category]){
        row[category]=[]
      }
      delete productTem.category;
      row[category].push(productTem)
    })

    for(let key in row){
      var rows = [];
      rows.push(<ProductCategoryRow key={key} category={key} />)
      row[key].map((v)=>{
        if(v.name.indexOf(this.props.filterText)!==-1&&!(!v.stocked&&!this.props.showStocked)){
          rows.push(<ProductRow key={v.name} price={v.price} stocked={v.stocked} name={v.name} />)
        }
      })
      cate.push(rows)
    }
    return(
      <table>
        <thead>
          <tr style={{fontWeight:700}}>
            <td>Name</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {cate}
        </tbody>
      </table>
    )
  }
}

class SearchBar extends React.Component{
  render(){
    return(
      <div>
        <input type="text" placeholder="Search..." value={this.props.filterText} onChange={this.props.handleSearch}/>
        <div><label><input type="checkbox" onChange={this.props.onlyShow}/>Only show products in stock</label></div>
      </div>
    )
  }
}
var PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];
class Product extends React.Component{
  constructor(){
    super();
    this.state = {
      showStocked:true,
      filterText:""
    }
    this.onlyShow = this.onlyShow.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e){
    this.setState({
      filterText:e.target.value
    })
  }
  onlyShow(){
    this.setState({
      showStocked:!this.state.showStocked
    })
  }
  render(){
    return(
      <Div>
        <SearchBar onlyShow={this.onlyShow} handleSearch={this.handleSearch}/>
        <ProductTable { ...this.state } products={PRODUCTS}/>
      </Div>
    )
  }
}
export default Product
