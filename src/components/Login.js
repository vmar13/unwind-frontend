import React from 'react'
import { Redirect } from 'react-router-dom'


class Login extends React.Component{

    state = {
        username: '',
        password: '',
        displayError: ''
    }



    handleChange = e =>  {
        this.setState({ [e.target.name]: e.target.value })
    } 

    handleSubmit = e => {
        e.preventDefault()

        fetch('http://localhost:3000/api/v1/login', {
            method: 'POST',
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            }),
            headers: {
             'Content-Type': 'application/json'
            }
            })
            .then(res => res.json())
            .then(data => {
                if(!data.jwt){
                    this.setState({ displayError: data.error })
                } else {
                    this.props.updateUsername(data.user.username)
                    localStorage.clear()
                    const userInfo = {
                        'id': data.user.id,
                        'username': data.user.username,
                        'token': data.jwt
                    }
                    localStorage.setItem('user', JSON.stringify(userInfo))
                    this.props.toggleLoggedIn()
                }
            })
    }

    render(){

        const { username, password } = this.state

        return(
            <>
            <div id='login-form-container'>
                <form id='login-form' onSubmit={this.handleSubmit}>
                    <label className='form-title'>Log In</label><br/>
                    <input type='text' name='username' value={username} onChange={this.handleChange} placeholder='Username'/><br/>
                    <input type='password' name='password'value={password} onChange={this.handleChange} placeholder='Password'/><br/>
                    <input type='submit' value='Log In'/><br/><br/>
                    <p className='form-extra-text'>Don't have an account? <a href='/signup' className='signup-link'>Sign Up</a></p>
                </form>
                {this.props.loggedIn ? <Redirect to='/profile'/> : null}
                {this.state.displayError ? <p className='error-message'>{this.state.displayError}</p> : null }
            </div>
                
                <div className='home-img-container'>
                    <img src='https://images.unsplash.com/photo-1538495435388-104fd74d46a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2841&q=80' alt='home' className='home-img' />
                </div>
            </>
        )
    }
}

export default Login