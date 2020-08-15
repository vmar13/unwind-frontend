import React from 'react';
import './App.css';
import AlternateNostril from './AlternateNostril';
import Ujjayi from './Ujjayi'
import WimHof from './WimHof';

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
    </>
  )
}
}
  

export default App;
