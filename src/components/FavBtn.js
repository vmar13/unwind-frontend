import React from 'react'

class FavBtn extends React.Component {
    
    state = {
        favorited: false
    }

    checkForDupes = () => {
        const { localStorageFavs, BTname } = this.props
        localStorageFavs.includes(BTname) ? 
        this.setState({ favorited: true }) : this.setState({ favorited: false })
    }
    
    componentDidMount = () => {
        this.checkForDupes()
    }

    render () {
        const { favoriteBT, unFavoriteBT, BTname} = this.props
        const { favorited } = this.state

        return (
            <>
                {favorited ? 
                <button 
                id={BTname}
                // className='favorite-btn'
                onClick={unFavoriteBT}>Favorite</button> 
                : 
                <button 
                id={BTname}
                // className='favorite-btn'
                onClick={favoriteBT}>UnFavorite</button>}
                
            </>
        )
    }
}

export default FavBtn

