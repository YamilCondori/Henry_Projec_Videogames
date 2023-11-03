import styles from './card.module.css'

const Card=({props})=>{
    const { id, image , name, genres } = props


    return(
            <div key={id} className={styles.cardBox}>
                <h3 className={styles.title}>{name}</h3>
                {genres?.map(elm=> {
                    return <li key={elm.name}>
                        {elm.name}
                    </li>
                    })}
                <img src={image} alt="" />
            </div>        
    )

}

export default Card;