import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = ({ breathingTechs }) => {
    return(
        <div className='nav-container'>
            {/* <NavLink to='/' className='nav-element'><strong>Home</strong></NavLink><br/>
            <NavLink to='/alt-nostril' className='nav-element'><strong>Alternate Nostril Breathing</strong></NavLink><br/>
            <NavLink to='/ujjayi' className='nav-element'><strong>Ujjayi</strong></NavLink><br/>
            <NavLink to='/wimhof' className='nav-element'><strong>Wim Hof</strong></NavLink><br/>
            <NavLink to='/diaphragmatic-breathing' className='nav-element'><strong>Diaphragmatic Breathing</strong></NavLink><br/>
            <NavLink to='/lions-breath' className='nav-element'><strong>Lion's Breath</strong></NavLink><br/>
            <NavLink to='/hummingbee' className='nav-element'><strong>Hummingbee</strong></NavLink><br/>
            <NavLink to='/breath-of-fire' className='nav-element'><strong>Breath of Fire</strong></NavLink><br/>
            <NavLink to='/pursed-lip' className='nav-element'><strong>Pursed Lip</strong></NavLink><br/> */}
            {/* <NavLink to='/breathing-techniques/:id/' className='nav-element'> {breathingTechs.map(breathingTech => <strong>{breathingTech.name}</strong>)}</NavLink><br/> */}
            {breathingTechs.map(breathingTech => <NavLink to={`/breathing-techniques/${breathingTech.id}`} className='nav-element'><strong>{breathingTech.name}</strong></NavLink>)}
        </div>
    )
}

export default NavBar

