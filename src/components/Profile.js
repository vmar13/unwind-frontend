import React from 'react'
import Dropdown from '../components/Dropdown'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const API_PROFILE = `http://localhost:3000/api/v1/profile`
const API_PRACTICE_TIMES = `http://localhost:3000/api/v1/practice_times`
const API_FAVORITES = `http://localhost:3000/api/v1/favorites`



class Profile extends React.Component {

    state = {
        allFavs: [],
        favObj: {}
    }

    componentDidMount() {
        this.renderUserProfile()
        this.props.fetchBTs()
        this.getFavorites()
    }

    renderUserProfile = () => {
    const user = JSON.parse(localStorage.getItem('user'))
        if (user) {
        fetch(API_PROFILE, {
            method: 'GET',
            headers: {Authorization: `Bearer ${user.token}`}})
            .then(res => res.json())
            .then(data => console.log(data))
        }
    }

    //tweak so it's only fetching favs for that specific user who's signed in
    //after .then, filter for allfavs that match the user id
    getFavorites = () => {
        const user = JSON.parse(localStorage.getItem('user'))

        fetch(API_FAVORITES, {
            method: 'GET',
            headers: {Authorization: `Bearer ${user.token}`}
        })
        .then(res => res.json())
        .then(allFavsData => {
            let userFavs = allFavsData.filter(fav => fav.user_id === user.id)
            this.setState({ allFavs: userFavs })
            // console.log(this.state.allFavs)
        })
    }

    //after fetching allFavs and updating empty [], 
    //need to display all fav names in a dropdown menu to create
    //practice times on calendar

    //on select, need to find specific fav from allFavs array in state; no need to re-fetch
    //all you need is the name
    handleSelectChange = event => {
        if(event.target.value === ''){
            return null 
        }  
        fetch(`${API_FAVORITES}/${event.target.value}`)  
        .then(res => res.json())
        .then(favorite => {
            this.setState({ favObj: favorite })
        })   
    }

    createPracticeTime = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        let practiceTime = {
            favorite_id: null,
            date: null, 
            time: null
        }

        fetch(API_PRACTICE_TIMES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({ practiceTime })
        })
    }
  

    render() {
        // console.log(this.state.allFavs)
       
        return (
            <>
            <div className='profile-welcome'>
                {this.props.username ? <h3 className='welcome-user'>Welcome, {this.props.username}!</h3> : null}
                {/* ability to create, update, or delete BT reminder */}
            </div>

            <Dropdown allFavs={this.state.allFavs} onSelectChange={this.handleSelectChange}/>
       

            <div id='full-calendar'>
                <FullCalendar
                
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectMirror={true}
                dayMaxEvents={true}
                aspectRatio= {6}
                height={600}

                />  
            </div>    
               
            </>
        )
    }
}

export default Profile 