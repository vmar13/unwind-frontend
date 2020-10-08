import React from 'react'
// import { Link } from 'react-router-dom'

class Form extends React.Component{

    state = {
        user: {
            username: '',
            password: ''
        }
    }

    handleChange = e =>  {
        let newUser = this.state.user
        newUser[e.target.name] = e.target.value 
        this.setState({ user: newUser })
    } 

    handleSubmit = e => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    

    render(){

        let {formName, formLink} = this.props
        let {username, password} = this.state.user

        return(
            <>
            <div id='login-form-container'>
                <form id='login-form' onSubmit={this.handleSubmit}>
                <h2>{formName}</h2>
                    <input type='text' name='username' value={username} onChange={this.handleChange} placeholder='Username'/><br/>
                    <input type='password' name='password'value={password} onChange={this.handleChange} placeholder='Password'/><br/>
                    <input type='submit' value='Submit'/><br/><br/>
                {formLink}   
                </form>
            </div>
                
                <div className='home-img-container'>
                    <img src='https://images.unsplash.com/photo-1538495435388-104fd74d46a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2841&q=80' alt='home' className='home-img' />
                </div>
            </>
        )
    }
}

export default Form