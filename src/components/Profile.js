import React from 'react'
// import NavBar from '../components/NavBar'


// const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`
const API_PROFILE = `http://localhost:3000/api/v1/profile`

class Profile extends React.Component {

    state = {
        breathingTechs: []
    }

    componentDidMount() {
        this.renderUserProfile()
    }

    renderUserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      fetch(API_PROFILE, {
        method: 'GET',
        headers: {Authorization: `Bearer ${user.token}`}})
        .then(res => res.json())
        .then(data => console.log(data))
    }
  }
  

    render() {

        // console.log(this.state.breathingTechs)

        return (
            <>
            {this.props.username ? <h3>Welcome, {this.props.username}!</h3> : null}
            <p>calendar goes here</p>
            <p>insert scheduled times</p>
            <p>ability to create, update, or delete BT reminder</p>
               
            </>
        )
    }
}

export default Profile 