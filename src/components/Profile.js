import React from 'react'
import NavBar from '../components/NavBar'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class Profile extends React.Component {

    state = {
        breathingTechs: []
    }

    componentDidMount() {
        this.renderBreathingTechs()
        this.renderUserProfile()
    }

    renderUserProfile = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user) {
      fetch(`http://localhost:3000/api/v1/profile`, {
        method: 'GET',
        headers: {Authorization: `Bearer ${user.token}`}})
        .then(res => res.json())
        .then(data => console.log(data))
    }
  }

    renderBreathingTechs = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        fetch(API_BREATHING_TECHS, {
            method: 'GET',
            headers: {Authorization: `Bearer ${user.token}`}})
        .then(res => res.json())
        .then(data => console.log(data))
        .then(breathing_techs => {
          this.setState({ breathingTechs: breathing_techs })
        })
    }
        

    render() {

        return (
            <>
            {this.props.username ? <h3>Welcome, {this.props.username}!</h3> : null}
            <p>calendar goes here</p>
            <p>insert scheduled times</p>
            <p>ability to create, update, or delete BT reminder</p>
               {this.props.loggedIn ? <NavBar breathingTechs={this.state.breathingTechs} /> : null}

            </>
        )
    }
}

export default Profile 