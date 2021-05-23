import React from 'react'


const Logout = (props) => {
  const onClick = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    props.setUser(null)
  }
  return (
    <button onClick={onClick}>logout</button>
  )
}

export default Logout