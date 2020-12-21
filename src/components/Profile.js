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
        favObj: {},
        start: '',
        end: '',
        filledIn: false,
        practiceTimes: [],
        eventClicked: false,
        title: '',
        practiceTimeId: null,
        practiceTime: {}
    }

    componentDidMount() {
        this.renderUserProfile()
        this.props.fetchBTs()
        this.getPracticeTimes()
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
    //if there ARE favorites, then fetch them; if NOT, do nothing
    // getFavorites = () => {
    //     const user = JSON.parse(localStorage.getItem('user'))

    //     fetch(API_FAVORITES, {
    //         method: 'GET',
    //         headers: {Authorization: `Bearer ${user.token}`}
    //     })
    //     .then(res => res.json())
    //     .then(allFavsData => {
    //         let userFavs = allFavsData.filter(fav => fav.user_id === user.id)
    //         this.setState({ allFavs: userFavs })
    //         console.log(this.state.allFavs)
    //     })
    // }

    getPracticeTimes = () => {
        const user = JSON.parse(localStorage.getItem('user'))

        fetch(API_PRACTICE_TIMES, {
            method: 'GET',
            headers: {Authorization: `Bearer ${user.token}`}
        })
        .then(res => res.json())
        .then(practiceTimesData => {
            if(practiceTimesData.length > 0){
                let userPTs = practiceTimesData.filter(practiceTime => practiceTime.user_id === user.id)
                this.setState({ practiceTimes: userPTs })
            } else {
                return
            }
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

    handleTimeSelection = (info) => {        
        this.setState({ 
            start: info.startStr,
            end: info.endStr,
            filledIn: true
        })
    }

    toggleFilledIn = () => {
        this.setState({ filledIn: !this.state.filledIn })
    }

    addNewPT = newPracticeTime => {
        this.setState({ practiceTimes: [...this.state.practiceTimes, newPracticeTime]})
    }

    //NOW -- fill out HTML that displays on condition of filledIn = true
    //Need to be able to select a day on calendar and prompt appears
    //that asks for time and has dropdown menu to select favorite BT

    createPracticeTime = (e) => {
        e.preventDefault()
        const user = JSON.parse(localStorage.getItem('user'))

        fetch(API_PRACTICE_TIMES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`
            },
            body: JSON.stringify({ 
                title: this.state.favObj.name,
                user_id: user.id,
                start: this.state.start, 
                end: this.state.end
             })
        })
        .then(res => res.json())
        .then(newPracticeTime => { this.addNewPT(newPracticeTime)})
        this.toggleFilledIn()
    }

    toggleEventClicked = () => {
        this.setState({ eventClicked: !this.state.eventClicked })
    }
  
    eventClick = info => {
        this.setState({ 
            eventClicked: true,
            title: info.event.title,
            start: JSON.stringify(info.event.start),
            end: JSON.stringify(info.event.end),
            practiceTimeId: info.event.id,
            practiceTime: info.event
        })
        // console.log(this.state.practiceTime)
    }

    cancelEvent = id => {
        const user = JSON.parse(localStorage.getItem('user'))

        fetch(`${API_PRACTICE_TIMES}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        .then(res => {
            let event = this.state.practiceTime
            event.remove()
            // let updatedPTs = this.state.practiceTimes.filter(practiceTime => practiceTime.id !== id)
            // this.setState({ practiceTimes: updatedPTs })
            // console.log(this.state.practiceTimes)
            this.toggleEventClicked()
        })
        
    }


    render() {

        const { start, end, filledIn, title, eventClicked } = this.state

        return (
            <>
            <div className='profile-welcome'>
                {this.props.username ? <h3 className='welcome-user'>Welcome, {this.props.username}!</h3> : null}
                {/* ability to create, update, or delete BT reminder */}
            </div>
            {/* <p>Schedule a time to practice your favorite breathing techniques.</p> */}
       
            {filledIn === true ? 
            <div id='calendar-form'>
                <button onClick={this.toggleFilledIn} id='cal-form-close-btn'>X</button>
                <div id='calendar-inner-form'>
                    <h4> Date & Time: from {start.slice(0,10)} at {start.slice(11,16)}  to  {end.slice(0,10)} at {end.slice(11,16)} </h4>
                    <h4>Choose a breathing technique to practice:</h4>
                    <Dropdown allFavs={this.props.allFavs} onSelectChange={this.handleSelectChange}/><br />
                    <button id='cal-form-submit-btn' onClick={this.createPracticeTime}>Submit</button>
                </div>
            </div>
            : null}

            {eventClicked === true ? 
            <div id='event-info'>
                <h4>{title}</h4> 
                <h4>Date: {start.slice(1,11)}</h4>
                <h4>From: {start.slice(12,17)} to {end.slice(12,17)}</h4>
                <button onClick={this.toggleEventClicked} id='event-close-btn'>X</button>
                <button onClick={() => this.cancelEvent(this.state.practiceTimeId)}>Cancel Event</button>
            </div>
            : null }

            <div id='full-calendar'>
                <FullCalendar
                
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                select={this.handleTimeSelection}
                eventBackgroundColor={'red'}
                headerToolbar={{
                left: 'prev,next',
                center: 'title', 
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                editable={true}
                selectable={true}
                dayMaxEvents={true}
                aspectRatio= {6}
                height={600}
                events={this.state.practiceTimes}
                eventClick={this.eventClick}
                />  
            </div>   
               
            </>
        )
    }
}

export default Profile 