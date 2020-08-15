import React from 'react';
import './App.css';
import AlternateNostril from './AlternateNostril';
import Ujjayi from './Ujjayi'
import WimHof from './WimHof';
import Diaphragmatic from './Diaphragmatic'
import LionsBreath from './LionsBreath'
import HummingBee from './HummingBee';

class App extends React.Component {
  
render () {
  return (
    <>
    <div>
      Homepage
    </div>

    <AlternateNostril />
    <Ujjayi />
    <WimHof />
    <Diaphragmatic />
    <LionsBreath />
    <HummingBee />
    </>
  )
}
}
  

export default App;
