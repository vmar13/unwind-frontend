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
        favObj: {},
        start: '',
        end: ''
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

    // handleDateClick = info => {
    //     console.log(info.dateStr)
    // }

    handleTimeSelection = (e) => {        
        // console.log('selected ' + info.startStr + ' to ' + info.endStr)
        let eventStart = e.startStr
        let eventEnd = e.endStr.slice(0,-6)
        this.setState({ 
            start: eventStart,
            end: eventEnd
        })
    }
    //Need to be able to select a day on calendar and prompt appears
    //that asks for time and has dropdown menu to select favorite BT

    // createPracticeTime = () => {
        handleDateClick = info => {
            //modal pops up with form, fill out form, submit btn invokes createPracTime function
        }

    handleDateClick = info => {
        const user = JSON.parse(localStorage.getItem('user'))
        let practiceTime = {
            favorite_id: null,
            date: info.dateStr, 
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
        console.log(this.state.start)
        console.log(this.state.end)

       
        return (
            <>
            <div className='profile-welcome'>
                {this.props.username ? <h3 className='welcome-user'>Welcome, {this.props.username}!</h3> : null}
                {/* ability to create, update, or delete BT reminder */}
            </div>
            {/* <p>Schedule a time to practice your favorite breathing techniques.</p> */}
            <Dropdown allFavs={this.state.allFavs} onSelectChange={this.handleSelectChange}/>
       

            <div id='full-calendar'>
                <FullCalendar
                
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={this.handleDateClick}
                select={this.handleTimeSelection}
                eventBackgroundColor={'#FF4500'}
                headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                dayMaxEvents={true}
                aspectRatio= {6}
                height={600}
                // customButtons={
                //     addEventButton={
                //         text: 'Add Event',
                //         click: function(){

                //         }
                //     }
                //     }

                />  
            </div>    
               
            </>
        )
    }
}

export default Profile 