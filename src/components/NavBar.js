import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ breathingTechs }) => {
    return(
        <div className='nav-container'>
            <NavLink to='/' className='nav-element'><strong>Home</strong></NavLink>
            {breathingTechs.map(breathingTech => <NavLink to={`/breathing_techniques/${breathingTech.id}`} key={breathingTech.id} className='nav-element'><strong>{breathingTech.name}</strong></NavLink>)}
        </div>
    )
}

export default NavBar

