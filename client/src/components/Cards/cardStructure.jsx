import styles from './card.module.css'

const Card=({props, showAll})=>{
    const { id, image , name, genres, platforms, releaseDate,rating } = props


    return(
        <>
        {showAll ? (
            <div key={id} className={styles.cardBox}>
                <h3 className={styles.title}>{name}</h3>
                {genres?.map(elm=> {
                    return <li key={elm.name+"-Card"}>
                        {elm.name}
                    </li>
                    })}
                    <p>{props.rating}</p>
                {image ? <img src={image} alt="" /> : <p>No image available</p>}
                {platforms.map(elm=>{
                    return(<li key={elm + "Plarforms"} >
                        {elm}
                    </li>)
                })}
                <p>{releaseDate}</p>
                <p>{rating}</p>
            </div>
        )
        :   (<div key={id} className={styles.cardBox}>
                <h3 className={styles.title}>{name}</h3>
                {genres?.map(elm=> {
                    return <li key={elm.name+"-Card"}>
                        {elm.name}
                    </li>
                    })}
                    <p>{props.rating}</p>
                {image ? <img src={image} alt="" /> : <p>No image available</p>}
            </div>  )      
        }
        </>
    )

}

export default Card;