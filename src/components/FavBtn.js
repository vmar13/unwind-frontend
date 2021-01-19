import React from 'react'

const FavBtn = ({favoriteBT, unFavoriteBT, BTname, favNames, allFavs}) => {

    console.log(favNames)

        return (
            <>

                {favNames.includes(BTname) ? 
                <button 
                id={BTname}
                className='favorite-btn'
                onClick={() => unFavoriteBT(allFavs)}><img src={require('../images/blue-heart.png')} alt='blue-heart' className='heart' /></button> 
                : 
                <button 
                id={BTname}
                className='favorite-btn'
                onClick={favoriteBT}><img src={require('../images/heart-outline.png')} alt='heart-outline' className='heart' /></button>}

                
            </>
        )
}


        



export default FavBtn

