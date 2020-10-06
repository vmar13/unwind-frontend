import React from 'react'
import '../App.css'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import BreathingTech from '../components/BreathingTech'
import SignUp from '../components/SignUp'
import Profile from '../components/Profile'
import Login from '../components/Login'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`
const USER_PROFILE = `http://localhost:3000/api/v1/profile`

class App extends React.Component {

  state = {
    username: '',
    loggedIn: false,
    breathingTechs: []
  }

  componentDidMount() {
    this.renderBreathingTechs()
    this.verifyLoggedIn()
    this.renderUserProfile()
    // this.checkForToken()
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
      
      verifyLoggedIn = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(!user){
          return
        } else {
          this.setState({ username: user.username })
          this.setState({ loggedIn: true })
        }
      }

      renderUserProfile = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
          fetch(`${USER_PROFILE}/${user.id}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${user.token}`}
          })
            .then(res => res.json())
            .then(userProfile => {
              console.log(userProfile)
            })
        }
      }
      
    //   checkForToken = () => {
    //     if(localStorage.token){
    //       fetch('http://localhost:3000/api/v1/users/profile', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': localStorage.token
    //         }
    //         })
    //         .then(res => res.json())
    //         .then(this.handleProfile)
    //     }
    // }
      
  
  handleProfile = res => {
    if(res.user){
      localStorage.token = res.token 
      this.setState(res, () => {
        this.props.history.push('/profile')
      })
    } else {
      alert(res.error)
    }
  }
  
  
render () {
  console.log(localStorage)
  return (
    <>
    <div className='logo-name'>
      Unwind <img src={require('../images/tornado.png')} alt='tornado' className='logo' />
    </div>
  
   {this.state.username? <NavBar breathingTechs={this.state.breathingTechs}/> : null}

    <Switch>
      <Route path='/breathing_techniques/:id' render={ (routeProps) => {
        const breathingTechId = parseInt(routeProps.match.params.id)
      return <BreathingTech {...routeProps} 
      breathingTechId={breathingTechId} 
      /> }} />
      <Route path='/profile' render={ () => <Profile breathingTechs={this.state.breathingTechs}/>} />
      <Route path='/login' render={ (routeProps) => <Login showUserProfile={this.renderUserProfile} />} />
      <Route path='/' render={ () => <SignUp /> }/>

    </Switch>

    
    </>
  )
}
}
  

export default App;
