import { Link } from "react-router-dom"


const Card=({props})=>{
    const { id, image , name, genres } = props


    return(
        <Link to={`/videogame/${id}`} key={id}>
            <div key={id}>
                <h3>{name}</h3>
                {genres?.map(elm=> {
                    return <li key={elm.name}>
                        {elm.name}
                    </li>
                    })}
                <img src={image} alt="" />
            </div>        
        </Link>
    )

}

export default Card;