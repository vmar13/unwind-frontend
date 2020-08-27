import React from 'react'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`

class BreathingTech extends React.Component {

    state = {
        breathingTech: {}
    }


    //fetch breathing technique object
    componentDidMount(){
        fetch(`${API_BREATHING_TECHS}/${this.props.breathingTechId}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                breathingTech: data
            
            })
        })
    }
    


    render() {
        console.log(this.state.breathingTech)

        const { name, step_one, step_two, step_three, step_four } = this.state.breathingTech

        return(
        <>
            <div className='breathing-tech-container'>
                <h2>{name}</h2>
                <ul className='bt-instructions'>
                    <li>{step_one}</li>
                    <li>{step_two}</li>
                    <li>{step_three}</li>
                    <li>{step_four}</li>
                </ul>
            </div>
        </>
        )
    }
}

export default BreathingTech