import React, { useEffect } from 'react'
import { Redirect } from 'react-router'

const Logout = ({ clearUserAndFavorites, loggedIn }) => {
  useEffect(() => {
    clearUserAndFavorites()
  })

  return (
    <>
        
        {loggedIn ? <Redirect to='/login' /> : null}
    </>
  )
}

export default Logout

//ORIGINAL
// import React from 'react'
// import { Redirect } from 'react-router'


// const Logout = ({ clearUser, loggedIn }) => {


//   return (
//     <>
//         {clearUser()}
//         {loggedIn ? <Redirect to='/login' /> : null}
//     </>
//   )
// }

// export default Logout
