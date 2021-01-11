import React from 'react'

class FavBtn extends React.Component {
    
    // state = {
    //     favorited: false
    // }


    render () {
        const { favorited, favoriteBT, unFavoriteBT } = this.props

        return (
            <>
                {favorited ? 
                <button 
                className='favorite-btn'
                onClick={unFavoriteBT}>💙</button> 
                : 
                <button 
                className='favorite-btn'
                onClick={favoriteBT}>♡</button>}
                
            </>
        )
    }
}

export default FavBtn

{/* <button
className="btn btn-default"
style={buttonStyle}
onClick={this.props.handleClick}>{this.props.label}</button>
); */}