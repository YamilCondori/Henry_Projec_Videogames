import { useEffect } from "react"
import VideogamesCards from "../Cards/videogamesCards"
import NavigationBar from "../NavigationBar/NavigationBar"
import SearchBar from "../SearchBar/SearchBar"
import { useDispatch } from "react-redux"
import { getGenres, getVideogames } from "../../Redux/actions"

const HomePage =()=>{

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getVideogames());
        dispatch(getGenres());
    }, [])

    return(
        <div>
            <SearchBar/>
            Home
            <NavigationBar/>
            <VideogamesCards/>
        </div>
    )
}

export default HomePage