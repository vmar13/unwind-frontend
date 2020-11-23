import React from 'react'

const Dropdown = ({ allFavs, onSelectChange }) => {
        let options = allFavs.map( fav => 
            <option key={fav.id} value={fav.id}>{fav.name}</option> )
    
    return(
        <select  onChange={onSelectChange}>
                <option value='' >Favorites</option>
                {options}
            </select>
    )
}

export default Dropdown 