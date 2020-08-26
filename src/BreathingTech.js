import React from 'react'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class BreathingTech extends React.Component {

    state = {
        breathingTech: {}
    }

    //fetch breathing technique object
    // getBreathingTech = () => {
    //     fetch(`${API_BREATHING_TECHS}/${this.props.breathingTechId}`)
    //     .then(res => res.json())
    //     .then(data => {
    //         this.setState({
    //             breathingTech: data
            
    //         })
    //     })
    // }

    render() {

        const { name } = this.props.breathingTech
        // const { breathingTech } = this.state
        return(
        <>
        <h2>{name}</h2>
      
        </>
        )
    }
}

export default BreathingTech