import React from 'react'
import { NavLink } from 'react-router-dom'

// const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

const renderBreathingTech = (path) => {
    const user = JSON.parse(localStorage.getItem('user'))
    fetch(path, {
        method: 'GET',
        headers: {Authorization: `Bearer ${user.token}`}})
    .then(res => res.json())
    .then(breathing_tech => {
      console.log(breathing_tech)
    })
}

const NavBar = ({ breathingTechs }) => {

    // renderBreathingTech = (path) => {
    //     const user = JSON.parse(localStorage.getItem('user'))
    //     fetch(path, {
    //         method: 'GET',
    //         headers: {Authorization: `Bearer ${user.token}`}})
    //     .then(res => res.json())
    //     .then(breathing_tech => {
    //       console.log(breathing_tech)
    //     })
    // }

    return(
        <div className='nav-container'>
            {/* <NavLink to='/' className='nav-element'><strong>Home</strong></NavLink> */}
            {/* {breathingTechs.map(breathingTech => <NavLink to={renderBreathingTech(`${API_BREATHING_TECHS}/${breathingTech.id}`)} key={breathingTech.id} className='nav-element'><strong>{breathingTech.name}</strong></NavLink>)} */}
            {/* {breathingTechs.map(breathingTech => <NavLink to={`/breathing_techniques/${breathingTech.id}`} key={breathingTech.id} className='nav-element'><strong>{breathingTech.name}</strong></NavLink>)} */}
       
            {breathingTechs.map(breathingTech => <NavLink 
            to={`/breathing_techniques/${breathingTech.id}`} key={breathingTech.id} className='nav-element'
            isActive={(match, location) => {
                if(!match){
                    return false
                } 
                return renderBreathingTech(location)
                }
            }
            ><strong>{breathingTech.name}</strong>
            </NavLink>)}


        </div>
    )
}

export default NavBar

