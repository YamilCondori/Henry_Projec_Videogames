import styles from './card.module.css'

const Card=({props})=>{
    const { id, image , name, genres } = props


    return(
            <div key={id} className={styles.cardBox}>
                <h3 className={styles.title}>{name}</h3>
                {genres?.map(elm=> {
                    return <li key={elm.name+"-Card"}>
                        {elm.name}
                    </li>
                    })}
                {image ? <img src={image} alt="" /> : <p>No image available</p>}
            </div>        
    )

}

export default Card;