import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import AlternateNostril from './AlternateNostril';
import Ujjayi from './Ujjayi'
import Diaphragmatic from './Diaphragmatic'
import LionsBreath from './LionsBreath'
import HummingBee from './HummingBee';
import BreathOfFire from './BreathOfFire';
import PursedLip from './PursedLip';
import NavBar from './NavBar';

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
      Unwind <img src={require('./images/tornado.png')} alt='tornado' className='logo' />
    </div>

    {/* <div>
      {this.state.breathingTechs.map(breathing_tech => <div></div>) }
    </div> */}
   
   <NavBar />

    <Switch>
      <Route path='/alt-nostril' render={ () => <AlternateNostril />} />
      <Route path='/ujjayi' render={ () => <Ujjayi /> } />
      <Route path='/diaphragmatic-breathing' render={ () => <Diaphragmatic />} />
      <Route path='/lions-breath' render={ () => <LionsBreath />} />
      <Route path='/hummingbee' render={ () => <HummingBee />} />
      <Route path='/breath-of-fire'render={ () => <BreathOfFire />} />
      <Route path='/pursed-lip' render={ () => <PursedLip />}  />
    </Switch>

    
    </>
  )
}
}
  

export default App;
