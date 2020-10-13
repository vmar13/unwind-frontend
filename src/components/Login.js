import React from 'react'
import { Redirect } from 'react-router-dom'


class Login extends React.Component{

    state = {
        username: '',
        password: '',
        hasError: false
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
                    this.setState({hasError: true})
                } else {
                    this.props.updateUsername(data.user.username)
                    localStorage.clear()
                    const userInfo = {
                        'id': data.user.id,
                        'username': data.user.username,
                        'token': data.jwt
                    }
                    localStorage.setItem('user', JSON.stringify(userInfo))
                    this.props.userLoggedIn()
                }
            })
    }

    render(){

        const { username, password } = this.state

        return(
            <>
            <div id='login-form-container'>
                <form id='login-form' onSubmit={this.handleSubmit}>
                    <label id='home-title'>Log In</label><br/>
                    <input type='text' name='username' value={username} onChange={this.handleChange} placeholder='Username'/><br/>
                    <input type='password' name='password'value={password} onChange={this.handleChange} placeholder='Password'/><br/>
                    <input type='submit' value='Log In'/><br/><br/>
                    <p>Don't have an account?</p><a href='/signup' className='signup-link'>Sign Up</a>
                </form>
                {this.props.loggedIn ? <Redirect to='/profile' /> : null}

            </div>
                
                <div className='home-img-container'>
                    <img src='https://images.unsplash.com/photo-1538495435388-104fd74d46a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2841&q=80' alt='home' className='home-img' />
                </div>
            </>
        )
    }
}

export default Login