import React from 'react'
import FavBtn from '../components/FavBtn'

const API_BREATHING_TECHS = `http://localhost:3000/api/v1/breathing_techniques`
const API_FAVORITES =  `http://localhost:3000/api/v1/favorites`

class BreathingTech extends React.Component {
    _isMounted = false

    state = {
        breathingTech: {},
        favNames: [],
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

    favoriteBT = () => {
            const user = JSON.parse(localStorage.getItem('user'))

            //send POST request to create favorite of BT
            fetch(API_FAVORITES, {
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
            .then(newFav => {
                console.log(newFav)
                this.props.addNewFav(newFav)
                let newFavName = newFav.name
                this.setState({ favNames: [...this.state.favNames, newFavName]})      

            })
    }
            
    unFavoriteBT = (arr) => {
        const user = JSON.parse(localStorage.getItem('user'))
        let favId 
        let favName

        for(let favObj of arr){
            if(favObj.name === this.state.breathingTech.name){
                favId = favObj.id
                favName = favObj.name
            }
        }

        fetch(`${API_FAVORITES}/${favId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            })
            this.props.deleteFav(favId)
            this.setState({ favNames: this.state.favNames.filter(name => name !== favName)})      
    }

    createFavNamesArr = arr => {
        const favNamesArr = []

        for(let favObj of arr){
          const favName = favObj.name
          favNamesArr.push(favName)
        }

        this.setState({ favNames: favNamesArr })
    }

    componentDidMount(){
       this._isMounted = true 
       this.getOneBreathingTech()
       this.createFavNamesArr(this.props.allFavs)

    }

    componentDidUpdate(prevProps, prevState) {
      if(prevProps.breathingTechId !== this.props.breathingTechId){
        this.getOneBreathingTech()
        this.createFavNamesArr(this.props.allFavs)
        this._isMounted = true

      } else {
        return
      }
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        

        const { name, step_one, step_two, step_three, step_four } = this.state.breathingTech
        // console.log(this.state.favNames)
       
        return(
        <>
         
            <div className='breathing-tech-container'>
                {name === 'Alternate Nostril Breathing' ? 
                [<p className='anim-split-left' key='1'>alt nost animation</p>,
                 <p className='anim-split-right' key='2'>alt nost animation2</p>] : null}

                {name === 'Ujjayi' ? [<div className='anim-fog-div' key='1'>,<div className='anim-fog' key='2'>ujjayi animation</div>,</div>] : null}

                {name === 'Diaphragmatic Breathing' ? <p className='anim-circle'>diaphragmatic animation</p> : null}

                {name === "Lion's Breath" ? 
                [<p className='anim-circle' key='1'>Lion's breath animation</p>, 
                <p className='anim-tongue' key='2'>tongue</p>, 
                <p className='anim-eye-left' key='3'>eye1</p>, 
                <p className='anim-eye-right' key='4'>eye2</p>, 
                <p className='anim-iris-left' key='5'>iris-1</p>, 
                <p className='anim-iris-right' key='6'>iris-2</p>] : null}

                {name === 'Humming Bee' ? <p className='anim-hum'>humming bee animation</p> : null}

                {name === 'Pursed Lip' ? 
                [<p className='anim-pursed-lip' key='1'>pursed lip animation</p>,
                <p className='anim-left-upper-lip' key='2'>leftsidelip</p>,
                <p className='anim-right-upper-lip' key='3'>rightsidelip</p>,
                <p className='anim-lower-lip-left' key='4'>lowerlip</p>,
                <p className='anim-lower-lip-right' key='5'>lowerlip</p>] : null}

                <h2>{name} <FavBtn 
                favoriteBT={this.favoriteBT} 
                unFavoriteBT={this.unFavoriteBT} 
                BTname={name}
                favNames={this.state.favNames}
                allFavs={this.props.allFavs}
                /></h2>

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