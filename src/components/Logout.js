import React from 'react'
import { Redirect } from 'react-router'



const Logout = ({ clearUser, loggedIn }) => {


  return (
    <>
        {clearUser()}
        {loggedIn ? <Redirect to='/login' /> : null}
    </>
  )
}

export default Logout
