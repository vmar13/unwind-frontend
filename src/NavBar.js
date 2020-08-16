import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return(
        <div>
            <NavLink to='/alt-nostril' className='nav-element'><strong>Alternate Nostril Breathing</strong></NavLink>
            <NavLink to='/ujjayi' className='nav-element'><strong>Ujjayi</strong></NavLink>
            <NavLink to='/wimhof' className='nav-element'><strong>Wim Hof</strong></NavLink>
            <NavLink to='/diaphragmatic-breathing' className='nav-element'><strong>Diaphragmatic Breathing</strong></NavLink>
            <NavLink to='/lions-breath' className='nav-element'><strong>Lion's Breath</strong></NavLink>
            <NavLink to='/hummingbee' className='nav-element'><strong>Hummingbee</strong></NavLink>
            <NavLink to='/breath-of-fire' className='nav-element'><strong>Breath of Fire</strong></NavLink>
            <NavLink to='/pursed-lip' className='nav-element'><strong>Pursed Lip</strong></NavLink>

        </div>
    )
}

export default NavBar
