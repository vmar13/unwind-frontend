import React from 'react'
import '../App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import BreathingTech from '../components/BreathingTech'
import SignUp from '../components/SignUp'
import Profile from '../components/Profile'
import Login from '../components/Login'
import Logout from '../components/Logout'
import NavBar from '../components/NavBar'


const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class App extends React.Component {

  state = {
    username: '',
    loggedIn: false,
    breathingTechs: []
  }

  componentDidMount() {
    this.checkForToken()
    this.renderBreathingTechs()
  }

    
    checkForToken = () => {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) {
        return
      } else {
        this.setState({username: user.username})
        this.setState({loggedIn: true})
      }
    }

  updateUsername = (username) => {
    this.setState({username})
  }

  userLoggedIn = () => {
    this.setState({loggedIn: !this.state.loggedIn})
  }

  renderBreathingTechs = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (!user || '/signup' || '/login') {
      return
    } else {
      fetch(API_BREATHING_TECHS, {
        method: 'GET',
        headers: {Authorization: `Bearer ${user.token}`}})
    .then(res => res.json())
    .then(breathing_techs => {
      this.setState({ breathingTechs: breathing_techs })
    })
    }
}
  
  
render () {
  // console.log(localStorage)
  return (
    <>
    <div className='logo-name'>
      Unwind <img src={require('../images/tornado.png')} alt='tornado' className='logo' />
    </div>
  
    {this.state.loggedIn ? <Redirect to='/profile' /> : null}

    <NavBar breathingTechs={this.state.breathingTechs} loggedIn={this.state.loggedIn} /> 

    <Switch>
      <Route path='/breathing_techniques/:id' render={ (routeProps) => {
        const breathingTechId = parseInt(routeProps.match.params.id)
      return <BreathingTech {...routeProps} 
      breathingTechId={breathingTechId} 
      /> }} />
      <Route path='/login' render={ () => <Login updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />} />
      <Route path='/logout' render={ () => <Logout updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />} />
      <Route path='/profile' render={ () => <Profile username={this.state.username} loggedIn={this.state.loggedIn} />} />
      <Route path='/signup' render={ () => <SignUp updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn} />} />
      <Route path='/' render={ () => <SignUp updateUsername={this.updateUsername} userLoggedIn={this.userLoggedIn} loggedIn={this.state.loggedIn}/>} />

    </Switch>

    
    </>
  )
}
}
  

export default App;
