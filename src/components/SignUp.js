import React from 'react'
import { Redirect } from 'react-router'


class SignUp extends React.Component {

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

        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
        })
            .then(res => res.json())
            .then(data => {
                if(!data.jwt){
                    this.setState({hasError: true})
                } else {
                    console.log('success', data)
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
                    <label id='home-title'>Sign Up</label><br/>
                    <p>{this.state.hasError ? 'There was an error creating your account.' : null}</p>
                    <input type='text' name='username' value={username} onChange={this.handleChange} placeholder='Username'/><br/>
                    <input type='password' name='password'value={password} onChange={this.handleChange} placeholder='Password'/><br/>
                    <input type='submit' value='Sign Up'/><br/><br/>
                    <p>Already have an account?</p><a href='/login'>Login</a>

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

export default SignUp