import VideogamesCards from "../Cards/videogamesCards"
import NavigationBar from "../NavigationBar/NavigationBar"
import SearchBar from "../SearchBar/SearchBar"

const HomePage =()=>{
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