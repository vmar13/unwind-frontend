import React from 'react'

class FavBtn extends React.Component {
    
    // state = {
    //     favorited: false
    // }

    checkForDupes = () => {
        const { localStorageFavs, BTname } = this.props
        // console.log(localStorageFavs)  //why am I getting an empty array?????
        localStorageFavs.includes(BTname) ?
        this.setState({ favorited: true }) : this.setState({ favorited: false })
    }
    
    componentDidMount = () => {
        this.checkForDupes()
    }

    render () {
        const { favoriteBT, unFavoriteBT, BTname, favorited} = this.props
        // const { favorited } = this.state
// console.log(this.props.localStorageFavs)
        return (
            <>
                {favorited ? 
                <button 
                id={BTname}
                className='favorite-btn'
                onClick={unFavoriteBT}>Unfavorite</button> 
                : 
                <button 
                id={BTname}
                className='favorite-btn'
                onClick={favoriteBT}>Favorite</button>}
                
            </>
        )
    }
}

export default FavBtn

