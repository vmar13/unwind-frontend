import React from 'react'
// import NavBar from '../components/NavBar'
import { NavLink } from 'react-router-dom'


const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class Profile extends React.Component {

    state = {
        breathingTechs: []
    }

    componentDidMount() {
        this.renderUserProfile()
        this.renderBreathingTechs()
    }

    renderUserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      fetch(`http://localhost:3000/api/v1/profile`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${user.token}`}})
        .then(res => res.json())
        .then(data => console.log(data))
    }
  }

    renderBreathingTechs = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        fetch(API_BREATHING_TECHS, {
            method: 'GET',
            headers: {Authorization: `Bearer ${user.token}`}})
        .then(res => res.json())
        .then(breathing_techs => {
          this.setState({ breathingTechs: breathing_techs })
        })
    }
        
    renderBreathingTech = (id) => {
        const user = JSON.parse(localStorage.getItem('user'))
        fetch(`${API_BREATHING_TECHS}/${id}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${user.token}`}})
        .then(res => res.json())
        .then(btObj => {
          console.log(btObj)
        })
    }

    render() {

        // console.log(this.state.breathingTechs)

        return (
            <>
            {this.props.username ? <h3>Welcome, {this.props.username}!</h3> : null}
            <p>calendar goes here</p>
            <p>insert scheduled times</p>
            <p>ability to create, update, or delete BT reminder</p>
               {/* {this.props.loggedIn ? <NavBar breathingTechs={this.state.breathingTechs} /> : null} */}
               
            <div className='nav-container'>
            {/* <NavLink to='/' className='nav-element'><strong>Home</strong></NavLink> */}
            {/* {breathingTechs.map(breathingTech => <NavLink to={renderBreathingTech(`${API_BREATHING_TECHS}/${breathingTech.id}`)} key={breathingTech.id} className='nav-element'><strong>{breathingTech.name}</strong></NavLink>)} */}
       
            {this.state.breathingTechs.map(breathingTech => 
            <NavLink 
            to={`/breathing_techniques/${breathingTech.id}`} 
            key={breathingTech.id} 
            className='nav-element'
            // onClick={() => this.renderBreathingTech(`/breathing_techniques/${breathingTech.id}`)}
            onClick={() => this.renderBreathingTech(breathingTech.id)}
            ><strong>{breathingTech.name}</strong>
            </NavLink>)}


        </div>
            </>
        )
    }
}

export default Profile 