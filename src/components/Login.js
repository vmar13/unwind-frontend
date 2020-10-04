import React from 'react'

class Login extends React.Component{
    render(){
        return(
            <>
            <div id='login-form-container'>
                <form id='login-form' onSubmit={this.handleSubmit}>
                    <label id='home-title'>Log In</label><br/>
                    <input type='text' name='username' value={username} onChange={this.handleChange} placeholder='Username'/><br/>
                    <input type='password' name='password'value={password} onChange={this.handleChange} placeholder='Password'/><br/>
                    <input type='submit' value='Sign Up'/><br/><br/>
                    <p>Don't have an account?</p><a href='#' className='signup-link'>Sign Up</a>

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