import React from 'react';
import '../App.css';
import { Route, Switch } from 'react-router-dom'
import NavBar from '../components/NavBar';
import BreathingTech from '../components/BreathingTech';
import Home from '../components/Home'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class App extends React.Component {

  state = {
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
  }
  
  
render () {
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
    </Switch>

    
    </>
  )
}
}
  

export default App;
