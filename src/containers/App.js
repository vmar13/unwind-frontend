import React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar';
import BreathingTech from '../components/BreathingTech';

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class App extends React.Component {

  state = {
    breathingTechs: []
  }

  componentDidMount() {
      fetch(API_BREATHING_TECHS)
      .then(res => res.json())
      .then(breathing_techs => {
        this.setState({ breathingTechs: breathing_techs })
      })
  }
  
  
render () {
  return (
    <>
    <div className='logo-name'>
      Unwind <img src={require('../images/tornado.png')} alt='tornado' className='logo' />
    </div>

    <button>Log in</button>
    <button>Sign up</button>
    
  
   
   <NavBar breathingTechs={this.state.breathingTechs}/>

    <Switch>
      <Route path='/breathing_techniques/:id' render={ (routeProps) => {
        const breathingTechId = parseInt(routeProps.match.params.id)
      return <BreathingTech {...routeProps} 
      breathingTechId={breathingTechId} 
      /> }} />
    </Switch>

    
    </>
  )
}
}
  

export default App;
