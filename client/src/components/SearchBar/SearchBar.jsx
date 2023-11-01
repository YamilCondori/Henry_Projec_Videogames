import { useState } from "react"

const SearchBar = () =>{
    const [ name , setName ] = useState('')
    // const dispatch= useDispatch();

    const handleClick=()=>{
        // dispatch(searchByName(name))
        console.log(name);
    }
    const handleChange=(event)=>{
        setName(event.target.value);
    }

    return(
        <nav>
            <input type="search" onChange={handleChange} value={name} placeholder="Search video games"/>
            <button onClick={handleClick} >Buscar</button>
        </nav>
    )
}

export default SearchBar;