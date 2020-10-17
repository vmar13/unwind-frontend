import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const API_PROFILE = `http://localhost:3000/api/v1/profile`

class Profile extends React.Component {


    componentDidMount() {
        this.renderUserProfile()
        this.props.fetchBTs()
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
  

    render() {

        return (
            <>
            <div className='profile-welcome'>
                {this.props.username ? <h3>Welcome, {this.props.username}!</h3> : null}
                {/* calendar goes here
                insert scheduled times
                ability to create, update, or delete BT reminder */}
            </div>

            <div>
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
                aspectRatio= {1}
                height={880}
                eventClick={this.joinEvent}
                />  
            </div>    
               
            </>
        )
    }
}

export default Profile 