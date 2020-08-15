import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom'
import AlternateNostril from './AlternateNostril';
import Ujjayi from './Ujjayi'
import WimHof from './WimHof';
import Diaphragmatic from './Diaphragmatic'
import LionsBreath from './LionsBreath'
import HummingBee from './HummingBee';
import BreathOfFire from './BreathOfFire';
import PursedLip from './PursedLip';

class App extends React.Component {
  
render () {
  return (
    <>
    <div>
      Homepage
    </div>

    <Switch>
      <Route path='/alt-nostril' render={ () => <AlternateNostril />} />
      <Route path='/ujjayi' render={ () => <Ujjayi /> }/>
      <WimHof />
      <Diaphragmatic />
      <LionsBreath />
      <HummingBee />
      <BreathOfFire />
      <PursedLip />
    </Switch>

    
    </>
  )
}
}
  

export default App;
