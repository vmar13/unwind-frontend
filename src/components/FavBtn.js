import React from 'react'

const FavBtn = ({favoriteBT, unFavoriteBT, BTname, favNames}) => {

    console.log(favNames)

        return (
            <>

                {favNames.includes(BTname) ? 
                <button 
                id={BTname}
                className='favorite-btn'
                onClick={unFavoriteBT}>💙</button> 
                : 
                <button 
                id={BTname}
                className='favorite-btn'
                onClick={favoriteBT}>♡</button>}

                
            </>
        )
}


        



export default FavBtn

