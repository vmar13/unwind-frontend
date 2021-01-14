import React from 'react'
import '../App.css'
import { Route, Switch } from 'react-router-dom'
import BreathingTech from '../components/BreathingTech'
import SignUp from '../components/SignUp'
import Profile from '../components/Profile'
import Login from '../components/Login'
import Logout from '../components/Logout'
import NavBar from '../components/NavBar'


const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`
const API_FAVORITES = `http://localhost:3000/api/v1/favorites`

class App extends React.Component {

  state = {
    username: '',
    loggedIn: false,
    breathingTechs: [],
    allFavs: [],
    localStorageFavs: []
  }

  componentDidMount() {
    this.stayLoggedIn()
    this.renderBreathingTechs()
    this.getFavorites()
  }

    
  stayLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      return
    } else {
      this.setState({
        username: user.username,
        loggedIn: true
      })
    }
  }

  updateUsername = (username) => {
    this.setState({username})
  }

  toggleLoggedIn = () => {
    this.setState({loggedIn: !this.state.loggedIn})
  }

  clearUser = () => {
    localStorage.clear()
    this.updateUsername('')
    this.toggleLoggedIn()
  }

  renderBreathingTechs = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user && '/profile') {
      fetch(API_BREATHING_TECHS, {
      method: 'GET',
      headers: {Authorization: `Bearer ${user.token}`}})
      .then(res => res.json())
      .then(breathing_techs => {
        this.setState({ breathingTechs: breathing_techs })
      })
    } else {
      return
    }
  }

  getFavorites = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const localStorFavNames = []
    // const allFavs = JSON.parse(localStorage.getItem('favorites') || '[]')

    if(user){
     fetch(API_FAVORITES, {
        method: 'GET',
        headers: {Authorization: `Bearer ${user.token}`}
    })
    .then(res => res.json())
    .then(allFavsData => {
      if(allFavsData.length > 0){
        let userFavs = allFavsData.filter(fav => fav.user_id === user.id)
        this.setState({ allFavs: userFavs })
        
        for(let favObj of userFavs){
          const favName = favObj.name
          localStorFavNames.push(favName)
        }

        this.setState({ localStorageFavs: localStorFavNames })
      } else {
        return
        // const allFavs = JSON.parse(localStorage.getItem('favorites') || '[]')
        // localStorage.setItem('favorites', JSON.stringify(allFavs))
      }
    })
    } else {
      return
    }
  }
  
//   getFavorites = () => {
//     const user = JSON.parse(localStorage.getItem('user'))

//     if(user){
//       fetch(API_FAVORITES, {
//         method: 'GET',
//         headers: {Authorization: `Bearer ${user.token}`}
//     })
//     .then(res => res.json())
//     .then(allFavsData => {
//       if(allFavsData.length > 0){
//         let userFavs = allFavsData.filter(fav => fav.user_id === user.id)
//         this.setState({ allFavs: userFavs })
//       } else {
//         return
//       }
//     })
//     } else {
//       return
//     }
// }

addNewFav = newFav => {
  this.setState({ 
      allFavs: [...this.state.allFavs, newFav],
  })
  console.log(this.state.allFavs)
}

deleteFav = favId => {
  this.setState({ allFavs: this.state.allFavs.filter(fav => fav.id !== favId)})
}


  
render () {
console.log(this.state.allFavs, this.state.localStorageFavs)

  return (
    <>
    <div className='logo-name'>
      Unwind <img src={require('../images/tornado.png')} alt='tornado' className='logo' />
    </div>
  
    {this.state.loggedIn ? <NavBar breathingTechs={this.state.breathingTechs} /> : null}


    <Switch>
      <Route path='/breathing_techniques/:id' render={ (routeProps) => {
        const breathingTechId = parseInt(routeProps.match.params.id)
      return <BreathingTech {...routeProps} 
      breathingTechId={breathingTechId}
      addNewFav={this.addNewFav} 
      deleteFav={this.deleteFav}
      /> }} />
      <Route path='/login' render={ () => <Login updateUsername={this.updateUsername} toggleLoggedIn={this.toggleLoggedIn} loggedIn={this.state.loggedIn} />} />
      <Route path='/logout' render={ () => <Logout loggedIn={this.state.loggedIn} clearUser={this.clearUser} />} />
      <Route path='/profile' render={ () => <Profile username={this.state.username} loggedIn={this.state.loggedIn} breathingTechs={this.state.breathingTechs} fetchBTs={this.renderBreathingTechs} allFavs={this.state.allFavs} />} />
      <Route path='/signup' render={ () => <SignUp updateUsername={this.updateUsername} toggleLoggedIn={this.toggleLoggedIn} loggedIn={this.state.loggedIn} />} />
      <Route path='/' render={ () => <SignUp updateUsername={this.updateUsername} toggleLoggedIn={this.toggleLoggedIn} loggedIn={this.state.loggedIn}/>} />

    </Switch>

    
    </>
  )
}
}
  

export default App;
