import React from 'react'
// import { Link } from 'react-router-dom'
import { BrowserRouter as Link } from 'react-router-dom';


class Login extends React.Component{

    state = {
        username: '',
        password: ''
    }

    handleChange = e =>  {
        this.setState({ [e.target.name]: e.target.value })
    } 

    handleSubmit = e => {
        e.preventDefault()

        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
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
                console.log(data)
            })
            .then( () => this.setState({ username: '', password: '' }))   
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
                    <input type='submit' value='Sign Up'/><br/><br/>
                    <p>Don't have an account?</p><Link className='signup-link' to="/signup" style={{color: 'white'}} activeStyle={{color: 'red'}}>Sign Up</Link>
                    {/* <p>Don't have an account?</p><Link className='signup-link' to="/signup">Sign Up</Link> */}

                </form>
            </div>
                
                <div className='home-img-container'>
                    <img src='https://images.unsplash.com/photo-1538495435388-104fd74d46a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2841&q=80' alt='home' className='home-img' />
                </div>
            </>
        )
    }
}

export default Login