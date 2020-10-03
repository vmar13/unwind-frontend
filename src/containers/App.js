import React from 'react'
import '../App.css'
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar'
import BreathingTech from '../components/BreathingTech'
import Home from '../components/Home'
import Profile from '../components/Profile'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class App extends React.Component {

  state = {
    username: '',
    loggedIn: false,
    breathingTechs: []
  }

  componentDidMount() {
      fetch(API_BREATHING_TECHS)
      // .then(res => res.text())
      // .then(text => console.log(text))
      .then(res => res.json())
      .then(breathing_techs => {
        this.setState({ breathingTechs: breathing_techs })
      })
      
      if(localStorage.token){
        fetch('http://localhost:3000/api/v1/users/profile', {
          method: 'GET',
          headers: {
              'Authorization': localStorage.token
          }
          })
          .then(res => res.json())
          .then(this.handleProfile)
      }
  }
  
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
  
   <NavBar breathingTechs={this.state.breathingTechs}/>

    <Switch>
      <Route path='/breathing_techniques/:id' render={ (routeProps) => {
        const breathingTechId = parseInt(routeProps.match.params.id)
      return <BreathingTech {...routeProps} 
      breathingTechId={breathingTechId} 
      /> }} />
      <Route path='/' render={ () => <Home /> }/>
      <Route path='/profile' render={ () => <Profile />} />
    </Switch>

    
    </>
  )
}
}
  

export default App;
