import React from 'react'

class Home extends React.Component {

    state = {
        username: '',
        password_digest: ''
    }

    handleChange = e =>  {
        this.setState({ [e.target.name]: e.target.value })
    } 

    handleSubmit = e => {
        e.preventDefault()

        const newUser = {
            username: this.state.username,
            password_digest: this.state.password_digest
        }

        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify( newUser )
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .then( () => this.setState({ username: '', password_digest: '' }))
            .catch( error => {
                alert(error.message)
            })
            
    }

    render(){

        const { username, password_digest } = this.state

        return(
            <>
            <div id='login-form-container'>
                <form id='login-form' onSubmit={this.handleSubmit}>
                    <label id='home-title'>Start to Unwind</label><br/>
                    <input type='text' name='username' value={username} onChange={this.handleChange} placeholder='Username'/><br/>
                    <input type='password' name='password_digest'value={password_digest} onChange={this.handleChange} placeholder='Password'/><br/>
                    <input type='submit' value='Sign Up'/><br/><br/>
                    <a href='#' className='signup-link'>Already have an account? Log in</a>

                </form>
            </div>
                
                <div className='home-img-container'>
                    <img src='https://images.unsplash.com/photo-1538495435388-104fd74d46a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2841&q=80' alt='home' className='home-img' />
                </div>
            </>
            )
    }
}

export default Home