import { withRouter } from 'next/router'

const ActiveLink = ({ children, router, href }) => {
  console.log("==============================="+router.pathname);
  const style = {
    marginRight: 10,
    color: router.pathname === href? 'red' : 'black'
  }
  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }
  return(
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default withRouter(ActiveLink)
