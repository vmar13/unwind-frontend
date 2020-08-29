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
        {name === 'Alternate Nostril Breathing' ? [<p className='anim-split-left'>alt nost animation</p>, <p className='anim-split-right'>alt nost animation2</p>] : null}
                {name === 'Ujjayi' ? <p className='anim-fog'>ujjayi animation</p> : null}
                {name === 'Diaphragmatic Breathing' ? <p className='anim-circle'>diaphragmatic animation</p> : null}
                {name === "Lion's Breath" ? <p>Lion's breath animation</p> : null}
                {name === 'Humming Bee' ? <p>humming bee animation</p> : null}
                {name === 'Pursed Lip' ? <p>pursed lip animation</p> : null}

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