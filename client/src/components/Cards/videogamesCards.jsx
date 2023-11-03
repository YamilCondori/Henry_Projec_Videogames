import { useDispatch, useSelector } from "react-redux"
import Card from "./cardStructure";
import { useEffect, useState } from "react";
import { getVideogames } from "../../Redux/actions";
import styles from './VideogamesCards.module.css'
import { Link } from "react-router-dom"


const VideogamesCards=()=>{
    const cards = useSelector(state=> state.cards);
    const dispatch = useDispatch()
    const [currentPage , setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(12);

    useEffect(()=>{
        dispatch(getVideogames())
    }, [])

    //Calculo del primer y último pokemon de la pagina
    const indexOfLastVideogame= currentPage* videogamesPerPage;
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
    const currentVideogame= cards.slice(indexOfFirstVideogame,indexOfLastVideogame);

    const previousPage=()=>{
        setCurrentPage(prevPage=>prevPage-1);
    }
    const nextPage=()=>{
        setCurrentPage(prevPage=>prevPage+1);
    }


    return(
        <div className={styles.cardsContainer} >
            <button onClick={previousPage} disabled={currentPage===1}>Previous</button>
            { currentVideogame?.map(videogame => {
                return (
                    <Link to={`/videogame/${videogame.id}`} key={videogame.id}>
                        <Card  key={videogame.id} props={videogame} />
                    </Link>
                )
            })}
            <button onClick={nextPage} disabled={indexOfLastVideogame>=cards.length}>Next</button>
        </div>
    )
}

export default VideogamesCards