import React from 'react'


const API_PROFILE = `http://localhost:3000/api/v1/profile`

class Profile extends React.Component {


    componentDidMount() {
        this.renderUserProfile()
        this.props.fetchBTs()
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

        return (
            <>
            <div className='profile-welcome'>
                {this.props.username ? <h3>Welcome, {this.props.username}!</h3> : null}
                {/* calendar goes here
                insert scheduled times
                ability to create, update, or delete BT reminder */}
            </div>
               
            </>
        )
    }
}

export default Profile 