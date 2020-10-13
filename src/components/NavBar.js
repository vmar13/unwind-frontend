import React from 'react'
import { NavLink } from 'react-router-dom'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

const renderBreathingTech = (id) => {
    const user = JSON.parse(localStorage.getItem('user'))
    fetch(`${API_BREATHING_TECHS}/${id}`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${user.token}`}})
    .then(res => res.json())
    .then(btObj => {
      console.log(btObj)
    })
}


const NavBar = ({ breathingTechs }) => {

    return(
        <div className='nav-container'>
            <NavLink to='/profile' className='nav-element'><strong>Profile</strong></NavLink>
            
            {breathingTechs.map(breathingTech => 
            <NavLink 
            to={`/breathing_techniques/${breathingTech.id}`} 
            key={breathingTech.id} 
            className='nav-element'
            onClick={() => renderBreathingTech(breathingTech.id)}
            ><strong>{breathingTech.name}</strong>
            </NavLink>)}

            <NavLink to='/logout' className='nav-element'><strong>Logout</strong></NavLink>

        </div>
    )
}

export default NavBar

