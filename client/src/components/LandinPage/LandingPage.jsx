import styles from './landingPage.module.css'
import { useNavigate } from 'react-router-dom'

const LandingPage=()=>{
    const navigate = useNavigate();

    const handleClick = () =>{
        navigate('/home')
    }
    
    return(
        <div className={styles.back} >
            <h1 className={styles.title} >VIDEOGAMES</h1>
            <div>
                <button className={styles.button} onClick={handleClick} >
                    Home
                </button>
            </div>
        </div>
    )
}

export default LandingPage