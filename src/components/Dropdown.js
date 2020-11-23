import React from 'react'

class Dropdown extends React.Component {

    render(){
        let allFavs = this.props.allFavs
        let options = allFavs.map( fav => 
            <option key={fav.id} value={fav.id}>{fav.name}</option> )
    
        return(
            <select className="#" onChange={this.props.onSelectChange}>
                <option value='' className='#'>Favorites</option>
                {options}
            </select>
        )
    } 
}


export default Dropdown 