import React from 'react'



class AlternateNostril extends React.Component {

   

    render() {

        const { breathingTechs } = this.props

        return(
            <>
            <h2>Alternate Nostril Breathing</h2>
            {/* {breathingTechs.filter(breathingTech => <div>{breathingTech.name === 'Alternate Nostril Breathing'}</div>)} */}
        {breathingTechs.map(breathingTech => <div>{breathingTech.name}</div>).filter(breathingTechFiltered => <div>{breathingTechFiltered.name === 'Alternate Nostril Breathing'}</div>)}
            </>
        )
    }
}

export default AlternateNostril