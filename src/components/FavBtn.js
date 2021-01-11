import React from 'react'

class FavBtn extends React.Component {
    
    // state = {
    //     favorited: false
    // }


    render () {
        const { favorited, favoriteBT, unFavoriteBT, BTname } = this.props

        return (
            <>
                {favorited ? 
                <button 
                id={BTname}
                // className='favorite-btn'
                onClick={unFavoriteBT}>💙</button> 
                : 
                <button 
                id={BTname}
                // className='favorite-btn'
                onClick={favoriteBT}>♡</button>}
                
            </>
        )
    }
}

export default FavBtn

