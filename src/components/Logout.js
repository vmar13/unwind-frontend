import React, { useEffect } from 'react'
import { Redirect } from 'react-router'

const Logout = ({ clearUser, loggedIn }) => {
  useEffect(() => {
    clearUser()
  })

  return (
    <>
        
        {loggedIn ? <Redirect to='/login' /> : null}
    </>
  )
}

export default Logout
