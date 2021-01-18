import React from 'react'

const FavBtn = ({favoriteBT, unFavoriteBT, BTname, favNames, allFavs}) => {

    console.log(favNames)

        return (
            <>

                {favNames.includes(BTname) ? 
                <button 
                id={BTname}
                className='favorite-btn'
                onClick={() => unFavoriteBT(allFavs)}>Unfavorite</button> 
                : 
                <button 
                id={BTname}
                className='favorite-btn'
                onClick={favoriteBT}>Favorite</button>}

                
            </>
        )
}


        



export default FavBtn

