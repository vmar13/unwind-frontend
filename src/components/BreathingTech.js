import React from 'react'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`
const API_FAVORITES =  `http://localhost:3000/api/v1/favorites`

class BreathingTech extends React.Component {
    _isMounted = false

    state = {
        breathingTech: {},
        // blueHeart: false,
        favorite: {},
        isLoading: true
    }

    getOneBreathingTech = () => {
        const user = JSON.parse(localStorage.getItem('user'))

        fetch(`${API_BREATHING_TECHS}/${this.props.breathingTechId}`, {
            method: 'GET',
            headers: {Authorization: `Bearer ${user.token}`}
        })
        .then(res => res.json())
        .then(breathingTechObj => {
            if(this._isMounted){
                this.setState({
                breathingTech: breathingTechObj,
                isLoading: false
            })
            }    
        })
    }

    // toggleBlueHeart = () => {
    //     this.setState({ blueHeart: !this.state.blueHeart })
    // }

    //This both favorites and UNfavorites a BT
    async favoriteBT () {
        const user = JSON.parse(localStorage.getItem('user'))

        if(this.state.breathingTech.favorited === false && this.state.breathingTech.fav_id === 0){
            //send POST request to create favorite of BT
            await fetch(API_FAVORITES, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    favorite: { 
                        user_id: user.id,
                        breathing_technique_id: this.state.breathingTech.id,
                        name: this.state.breathingTech.name 
                    }      
                })
            })
            .then(res => res.json())
            .then(favObj => {
                this.props.addNewFav(favObj)
                this.setState({ favorite: favObj })
            })
            //send PATCH request to breathingTech to toggle favorited:false to true and assign fav_id
            await fetch(`${API_BREATHING_TECHS}/${this.state.breathingTech.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ 
                    favorited: true,
                    fav_id: this.state.favorite.id 
                })
            })
            .then(res => res.json())
            .then(data => console.log(data))
        } else {
            return
        }
    }
            
    unFavoriteBT = () => {
        const user = JSON.parse(localStorage.getItem('user'))

        if(this.state.breathingTech.favorited === true && this.state.breathingTech.fav_id !== 0) {
            const favId = this.state.breathingTech.fav_id
        // console.log(favId)

            fetch(`${API_FAVORITES}/${favId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            })
            this.props.deleteFav(favId)
            //send PATCH request to breathingTech to toggle favorited:true to false
            fetch(`${API_BREATHING_TECHS}/${this.state.breathingTech.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify({ 
                    favorited: false,
                    fav_id: 0 
                })
            })
            .then(res => res.json())
            .then(data => console.log(data))
        } else {
            return
        }
    }

    // async toggleFavBT () {
    //     const user = JSON.parse(localStorage.getItem('user'))

    //     if(this.state.breathingTech.favorited === false){
    //         //send POST request to create favorite of BT
    //         await fetch(API_FAVORITES, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${user.token}`
    //             },
    //             body: JSON.stringify({
    //                 favorite: { 
    //                     user_id: user.id,
    //                     breathing_technique_id: this.state.breathingTech.id,
    //                     name: this.state.breathingTech.name 
    //                 }      
    //             })
    //         })
    //         .then(res => res.json())
    //         .then(favObj => {
    //             this.props.addNewFav(favObj)
    //             this.setState({ favorite: favObj })
    //         })
    //         //send PATCH request to breathingTech to toggle favorited:false to true and assign fav_id
    //         await fetch(`${API_BREATHING_TECHS}/${this.state.breathingTech.id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${user.token}`
    //             },
    //             body: JSON.stringify({ 
    //                 favorited: true,
    //                 fav_id: this.state.favorite.id 
    //             })
    //         })
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    //     } else {
    //         //this.state.breathingTech.favorited === true
    //         // const user = JSON.parse(localStorage.getItem('user'))
    //         const favId = this.state.breathingTech.fav_id
    //         // console.log(favId)

    //         fetch(`${API_FAVORITES}/${favId}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${user.token}`
    //             }
    //         })
    //         this.props.deleteFav(favId)
    //         //send PATCH request to breathingTech to toggle favorited:true to false
    //         fetch(`${API_BREATHING_TECHS}/${this.state.breathingTech.id}`, {
    //             method: 'PATCH',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 Authorization: `Bearer ${user.token}`
    //             },
    //             body: JSON.stringify({ 
    //                 favorited: false,
    //                 fav_id: 0 
    //             })
    //         })
    //         .then(res => res.json())
    //         .then(data => console.log(data))
    //     }
    // }

    componentDidMount(){
       this._isMounted = true 
       this.getOneBreathingTech()
    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.breathingTechId !== this.props.breathingTechId){
        this.getOneBreathingTech()
        this._isMounted = true
      } else {
        return
      }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        // console.log(this.state.allFavorites)

        const { name, step_one, step_two, step_three, step_four, favorited } = this.state.breathingTech
        const { blueHeart, toggleBlueHeart } = this.props
       
        return(
        <>
         
            <div className='breathing-tech-container'>
                {name === 'Alternate Nostril Breathing' ? [<p className='anim-split-left' key='1'>alt nost animation</p>, <p className='anim-split-right' key='2'>alt nost animation2</p>] : null}
                {name === 'Ujjayi' ? [<div className='anim-fog-div' key='3'>,<div className='anim-fog' key='4'>ujjayi animation</div>,</div>] : null}
                {name === 'Diaphragmatic Breathing' ? <p className='anim-circle'>diaphragmatic animation</p> : null}
                {name === "Lion's Breath" ? <p className='anim-circle'>Lion's breath animation</p> : null}
                {name === 'Humming Bee' ? <p className='anim-circle'>humming bee animation</p> : null}
                {name === 'Pursed Lip' ? <p className='anim-circle'>pursed lip animation</p> : null}

                <h2>{name} <button onClick={() => {
                    this.favoriteBT()
                    this.unFavoriteBT()
                    toggleBlueHeart()
                     }}
                     //need to fix so that blue heart appear without pg refresh
                    className='favorite-btn'>{blueHeart ? '💙' : '♡'}</button></h2>

                <ul className='bt-instructions'>
                    <li>{step_one}</li>
                    <li>{step_two}</li>
                    <li>{step_three}</li>
                    <li>{step_four}</li><br/>
                    {step_four === 'Inhale through the right nostril and then close this nostril. Open the left nostril and exhale through the left side. This is one cycle. Continue for up to 5 minutes. Always complete the practice by finishing with an exhale on the left side.' ?
                    <a href='https://www.healthline.com/health/alternate-nostril-breathing' className='source'>Healthline</a> : null}
                    {step_four === 'Concentrate on the sound of your breath; allow it to soothe your mind. Let your inhalations fill your lungs to their fullest expansion. Completely release the air during your exhalations. Practice for 5 minutes and eventually work your way up to 15 minutes.' ?
                    <a href='https://www.yogaoutlet.com/blogs/guides/how-to-practice-ujjayi-breath-in-yoga' className='source'>Yoga Outlet</a> : null}
                    {step_four === 'When you first learn the diaphragmatic breathing technique, it may be easier for you to follow the instructions lying down. As you gain more practice, you can try the diaphragmatic breathing technique while sitting in a chair' ?
                    <a href='https://my.clevelandclinic.org/health/articles/9445-diaphragmatic-breathing#:~:text=Diaphragmatic%20breathing%20technique&text=Place%20one%20hand%20on%20your,remain%20as%20still%20as%20possible.' className='source'>Cleveland Clinic</a> : null}
                    {step_four === 'Breathe normally for a few moments. Repeat lion’s breath up to 7 times. Finish by breathing deeply for 1 to 3 minutes.' ?
                    <a href='https://www.healthline.com/health/practicing-lions-breath' className='source'>Healthline</a> : null}
                    {step_four === 'You can also make a low-pitched sound, but it is a good idea to make a high-pitched one for better results. Breathe in again and continue the same pattern for 6-7 times. Keep your eyes closed for some time.' ?
                    <a href='https://www.artofliving.org/us-en/yoga/breathing-techniques/bhramari-pranayama' className='source'>The Art of Living</a> : null}
                    {step_four === 'Then repeat. Over time, you can increase the inhale and exhale counts from 2 seconds to 4 seconds, and so on.' ?
                    <a href='https://www.healthline.com/health/pursed-lip-breathing' className='source'>Healthline</a> : null}
                </ul>
            </div>
        </>
        )
    }
}

export default BreathingTech