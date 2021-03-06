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


    stayFavorited = () => {
        const { localStorageFavs } = this.state
        const localStorFavNames = []
            const allFavs = JSON.parse(localStorage.getItem('favorites') || '[]')
        // console.log(allFavs)
        // console.log(typeof(allFavs))
       
            if(allFavs.length < 1){
                localStorage.setItem('favorites', JSON.stringify(allFavs))
                // return
            } else {
                const allFavsArr = Object.entries(allFavs)
                // console.log(allFavsArr)
                //return allFavsArr, pass it down as a prop to favBtn and 
                //compare each favName to BTname in that component

                for(let arrEle of allFavsArr){
                    const favName = arrEle[1].name 
                    localStorFavNames.push(favName)
                }
                // console.log(this.state.breathingTech.name)
                this.setState({ localStorageFavs: localStorFavNames})
                localStorageFavs.includes(this.state.breathingTech.name) ?
                this.setState({ favorited: true }) : this.setState({ favorited: false })
            }
        
    }


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
        // console.log(info)
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
            start: JSON.stringify(info.event.startStr),
            end: JSON.stringify(info.event.endStr),
            practiceTimeId: info.event.id,
            practiceTime: info.event
        })
        // console.log(info)
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
            this.toggleEventClicked()
        })  
    }

    render() {
        // console.log(this.state.start, this.state.end)

        const { start, end, filledIn, title, eventClicked } = this.state;
        let noFavs;
        if (this.props.allFavs.length < 1) {
            noFavs = "You don't have favorites yet. Check out breathing techniques in the nav bar and click the heart to 'favorite' one.";
        };

        return (
            <>
            <div className='profile-welcome'>
                {this.props.username ? <h3 className='welcome-user'>Welcome, {this.props.username}!</h3> : null}
            
            </div>
            {/* <p>Schedule a time to practice your favorite breathing techniques.</p> */}
       
            {filledIn === true ? 
            <div id='calendar-form'>
                <button onClick={this.toggleFilledIn} id='cal-form-close-btn'>X</button>
                <div id='calendar-inner-form'>
                    <h4> Date & Time: from {start.slice(0,10)} at {start.slice(11,16)}  to  {end.slice(0,10)} at {end.slice(11,16)} </h4>
                    <h4>Choose a breathing technique to practice:</h4>
                    <Dropdown allFavs={this.props.allFavs} onSelectChange={this.handleSelectChange}/><br /> <p>{noFavs}</p>
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
                <button onClick={() => this.cancelEvent(this.state.practiceTimeId)} id='event-cancel-btn'>Cancel Event</button>
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