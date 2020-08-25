import React from 'react'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class BreathingTech extends React.Component {

    state = {
        breathingTech: {}
    }


    getBreathingTech = () => {
        fetch(`${API_BREATHING_TECHS}/${this.props.breathingTechId}`)
        .then(res => res.json())
        .then(btObj => {
            this.setState({
                breathingTech: btObj
            })
        })
    }

    render() {

        const { breathingTech } = this.state

        return(
        <div>{breathingTech.name}</div>
        )
    }
}

export default BreathingTech