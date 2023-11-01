import { SEARCHBYNAME, GETVIDEOGAMES, GETGENRE, FILTER, ORDER, POSTVIDEOGAME } from "./actionTypes";
import axios from 'axios'

export const searchByName= (inputName)=>{
    const endpoint= 'http://localhost:3001/pokemons/name';
    return async (dispatch)=>{
        try {
            if(!inputName) throw Error('Ingrese un nombre porfavor');
            const { data } = await axios.get(`${endpoint}?name=${inputName}`)

            if(!data) throw Error('Algo salio mal')
            return dispatch({
                type: SEARCHBYNAME,
                payload: data
            })
        }
        catch (error) {
            return error.message
        }
    }
}

export const getVideogames=()=>{
    const endpoint='http://localhost:3001/videogames'
    return async (dispatch)=>{
        try {
            const { data }= await axios.get(endpoint);
            if(!data) throw Error('Algo salio mal')

            return dispatch({
                type: GETVIDEOGAMES,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const getGenres=()=>{
    const endpoint='http://localhost:3001/genres'
    return async (dispatch)=>{
        try {
            const { data } = await axios.get(endpoint);
            return dispatch({
                type: GETGENRE,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}

export const filter=(genre)=>{
    return async (dispatch)=>{
        try {
            return dispatch({
                type: FILTER,
                payload: genre
            })
        } catch (error) {
            return error.message
        }
    }
}

export const orderBy=(instructions)=>{
    return (dispatch)=>{
        try {
            return dispatch({
                type: ORDER,
                payload: instructions
            })
        } catch (error) {
            return error.message
        }
    }
}

export const postVideogame= (videogame)=>{
    const endpoint='http://localhost:3001/videogame'
    return  async(dispatch)=>{
        try {
            const { data }= await axios.post(endpoint, videogame);
            if(!data) throw Error('algo paso')

            return dispatch({
                type: POSTVIDEOGAME,
                payload: data
            })
        } catch (error) {
            return error.message
        }
    }
}