import { useSelector } from "react-redux"
import Card from "./cardStructure";
import { useState } from "react";
import styles from './VideogamesCards.module.css'
import { Link } from "react-router-dom"


const VideogamesCards=()=>{
    const cards = useSelector(state=> state.cards);
    const [currentPage , setCurrentPage] = useState(1);
    const [videogamesPerPage] = useState(15);

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
                    <Link to={`/detailPage/${videogame.id}`} key={videogame.id+"-Link"}>
                        <Card  key={videogame.id+"-card"} props={videogame} showAll={false} />
                    </Link>
                )
            })}
            <button onClick={nextPage} disabled={indexOfLastVideogame>=cards.length}>Next</button>
        </div>
    )
}

export default VideogamesCards