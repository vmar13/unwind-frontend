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

class App extends React.Component {
  
render () {
  return (
    <>
    <div className='logo-name'>
      Unwind <img src={require('./images/tornado.png')} alt='tornado' className='logo' />
    </div>
   
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
