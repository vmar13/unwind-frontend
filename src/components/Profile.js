import React from 'react'
import Dropdown from '../components/Dropdown'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const API_PROFILE = `http://localhost:3000/api/v1/profile`
const API_PRACTICE_TIMES = `http://localhost:3000/api/v1/practice_times`
const API_FAVORITES = `http://localhost:3000/api/v1/favorites`

//Will need to fetch practice_times (events) in order to display 
//on fullCalendar

class Profile extends React.Component {

    state = {
        allFavs: [],
        favObj: {},
        start: '',
        end: '',
        filledIn: false
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

    //---This time selection func needs to trigger a modal with form
    handleTimeSelection = (info) => {        
        // console.log('selected ' + info.startStr + ' to ' + info.endStr)
        // let eventStart = e.startStr
        // let eventEnd = e.endStr.slice(0,-6)
        this.setState({ 
            start: info.startStr,
            end: info.endStr,
            filledIn: true
        })
    }

    toggleFilledIn = () => {
        this.setState({ filledIn: !this.state.filledIn })
    }

    //NOW -- fill out HTML that displays on condition of filledIn = true
    //Need to be able to select a day on calendar and prompt appears
    //that asks for time and has dropdown menu to select favorite BT

    // createPracticeTime = () => {
        // handleDateClick = info => {
        //     //modal pops up with form, fill out form, submit btn invokes createPracTime function
        // }

    // handleDateClick = info => {
    //     const user = JSON.parse(localStorage.getItem('user'))
    //     let practiceTime = {
    //         favorite_id: null,
    //         date: info.dateStr, 
    //         time: null
    // }

    //     fetch(API_PRACTICE_TIMES, {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${user.token}`
    //         },
    //         body: JSON.stringify({ practiceTime })
    //     })
    // }
  

    render() {
        console.log(this.state.start)
        console.log(this.state.end)

        const { start, end, filledIn } = this.state
       
        return (
            <>
            <div className='profile-welcome'>
                {this.props.username ? <h3 className='welcome-user'>Welcome, {this.props.username}!</h3> : null}
                {/* ability to create, update, or delete BT reminder */}
            </div>
            {/* <p>Schedule a time to practice your favorite breathing techniques.</p> */}
       
            {filledIn === true ? 
            <div id='calendar-form'>
                <div id='calendar-inner-form'>
                    <h4> Date & Time: from {start.slice(0,10)} at {start.slice(11,16)}  to  {end.slice(0,10)} at {end.slice(11,16)} </h4>
                    <h4>Choose a breathing technique to practice:</h4>
                    <Dropdown allFavs={this.state.allFavs} onSelectChange={this.handleSelectChange}/>
                    <button onClick={'#'}>Submit</button>
                </div>
            </div>
            : null}

            <div id='full-calendar'>
                <FullCalendar
                
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                dateClick={this.handleDateClick}
                select={this.handleTimeSelection}
                eventBackgroundColor={'#FF4500'}
                headerToolbar={{
                left: 'prev,next addEventButton',
                center: 'title', 
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                dayMaxEvents={true}
                aspectRatio= {6}
                height={600}
                events={[
                    { title: 'Ujjayi', date: '2020-11-28', time: '7:00:00'}
                ]}

                />  
            </div>    
               
            </>
        )
    }
}

export default Profile 