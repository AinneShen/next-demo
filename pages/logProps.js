import React from 'react'

// const Page = ({ stars }) =>
//   <div>
//     Next stars: {stars}
//   </div>
//
// Page.getInitialProps = async ({ req }) => {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   return { stars: json.stargazers_count }
// }
//
// export default Page

export default class Page extends React.Component{
  static async getInitialProps({ isServer, req, query, asPath , pathname }){
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    return {stars: json.stargazers_count}
  }
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div>
        Next stars: {this.props.stars}
      </div>
    )
  }
}
