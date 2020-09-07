import React from 'react'

class Home extends React.Component {
    render(){
        return(
            <>
            <div id='login-form-container'>
                {/* <h2 id='home-title'>Start to Unwind</h2> */}
                <form id='login-form'>
                    <label id='home-title'>Start to Unwind</label><br/>
                    <input type='text' placeholder='Username'/><br/>
                    <input type='password' placeholder='Password'/><br/>
                    <input type='submit' /><br/><br/>
                    <a href='#' className='signup-link'>Don't have an account? Sign up</a>

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