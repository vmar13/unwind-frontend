import React from 'react'
import '../App.css'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import BreathingTech from '../components/BreathingTech'
// import SignUp from '../components/SignUp'
import Profile from '../components/Profile'
// import Login from '../components/Login'
import Form from '../components/Form'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`
const USER_PROFILE = `http://localhost:3000/api/v1/profile`

class App extends React.Component {

  // state = {
  //   username: '',
  //   token: '',
  //   breathingTechs: []
  // }

  state = {
    user: {
      id: 0,
      username: ''
    },
    token: '',
    breathingTechs: []
  }

  componentDidMount() {
    this.renderBreathingTechs()
    this.checkForToken()
    // this.verifyLoggedIn()
    // this.renderUserProfile()
  }

    renderBreathingTechs = () => {
      fetch(API_BREATHING_TECHS)
      // .then(res => res.text())
      // .then(text => console.log(text))
      .then(res => res.json())
      .then(breathing_techs => {
        this.setState({ breathingTechs: breathing_techs })
      })
    }
      
    checkForToken = () => {
      if(localStorage.token){
        fetch(USER_PROFILE, {
          headers: {
              'Authorization': localStorage.token
          }
          })
          .then(res => res.json())
          .then(this.handleRes)
        }
    }

    handleSignUpSubmit = userData => {
      fetch('http://localhost:3000/api/v1/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
          },
          body: JSON.stringify(userData)
      })
          .then(res => res.json())
          .then(data => this.handleRes(data))
          // .then( () => this.setState({ username: '', password: '' }))   
  }

  handleLoginSubmit = userData => {
    fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(r => r.json())
      .then(this.handleResponse)
  }

    handleRes = res => {
      if(res.user){
        localStorage.token = res.token 
        this.setState(res, () => {
          this.props.history.push('/profile')
        })
      } else {
        alert(res.error)
      }
    }

  //----------------RENDERING COMPONENTS-----------------//

  renderForm = (routeProps) => {
    if(routeProps.location.pathname === "/login"){
      return <Form
        formName="Login"
        user={this.state.user}
        handleSubmit={this.handleLoginSubmit}
        
      />
    } else if (routeProps.location.pathname === "/signup") {
      return <Form
      formName="Sign Up"
      handleSubmit={this.handleSignUpSubmit}
      />
    }
  }

      // verifyLoggedIn = () => {
      //   const user = JSON.parse(localStorage.getItem('user'))
      //   if(!user){
      //     return
      //   } else {
      //     this.setState({ username: user.username })
      //     this.setState({ loggedIn: true })
      //   }
      // }

      // renderUserProfile = () => {
      //   const user = JSON.parse(localStorage.getItem('user'))
      //   if(user){
      //     fetch(`${USER_PROFILE}/${user.id}`, {
      //       method: 'GET',
      //       headers: {Authorization: `Bearer ${user.token}`}
      //     })
      //       .then(res => res.json())
      //       .then(userProfile => {
      //         console.log(userProfile)
      //       })
      //   }
      // }
  
  
render () {
  console.log(localStorage)
  return (
    <>
    <div className='logo-name'>
      Unwind <img src={require('../images/tornado.png')} alt='tornado' className='logo' />
    </div>
  
   {this.state.user? <NavBar breathingTechs={this.state.breathingTechs}/> : null}

    <Switch>
      <Route path='/breathing_techniques/:id' render={ (routeProps) => {
        const breathingTechId = parseInt(routeProps.match.params.id)
      return <BreathingTech {...routeProps} 
      breathingTechId={breathingTechId} 
      /> }} />
      <Route path='/profile' render={ () => <Profile breathingTechs={this.state.breathingTechs}/>} />
      <Route path='/login' render={this.renderForm} />
      <Route path='/' render={this.renderForm} />

    </Switch>

    
    </>
  )
}
}
  

export default App;
