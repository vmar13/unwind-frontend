import React from 'react'

class Home extends React.Component {
    render(){
        return(
            <>
            <div className='login-form'>
                <h2 id='home-title'>Start to Unwind</h2>
                <form>
                    <input type='text' placeholder='Username'/><br/>
                    <input type='password' placeholder='Password'/><br/>
                    <input type='submit' />
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