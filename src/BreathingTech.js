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
        // const { breathingTechs } = this.props
        return(
        <>
            <div>
                name
            </div>
        </>
        )
    }
}

export default BreathingTech