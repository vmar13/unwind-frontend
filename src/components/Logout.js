import React, { useEffect } from 'react'
import { Redirect } from 'react-router'

const Logout = (props) => {

  useEffect(() => {
    localStorage.clear()
    props.updateUsername('')
    props.userLoggedIn()
    
  }, [props]);

  return (
    <>
      {props.loggedIn ? <Redirect to='/login' /> : null}
    </>
  )
}

export default Logout