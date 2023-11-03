import { SEARCHBYNAME, GETVIDEOGAMES, GETGENRE, FILTER, ORDER, POSTVIDEOGAME } from "./actionTypes"

const initialState={
    cards:[],
    filters:[],
    genres:[],
    aux:[]
}

const reducer=(state=initialState , { type, payload })=>{
    switch (type) {
        case SEARCHBYNAME: {
            return { ...state, cards: [...state.cards, payload], aux:[...state.aux, payload]}
        }
        case GETVIDEOGAMES: return {...state, cards: payload, aux: payload}
        case GETGENRE: return {...state, genres: payload}
        case FILTER: {
            if(payload===''){
                return {...state, cards: state.aux}
            }
            if(payload==='API'){
                const fromApi = state.aux.filter(videogame=> typeof +videogame.id=== 'number')
                return {...state, cards: fromApi}
                }
            if(payload==='DB'){
                const fromDB = state.aux.filter(videogame=> typeof +videogame.id === 'string');
                return {...state, cards: fromDB}
                }
            const filtereds = state.aux.filter(videogame=> videogame.genres.some((genre)=>genre.name === payload))
            return {...state, cards: filtereds }
        }
        case ORDER: {
            let updatedCards= [...state.cards];
            if(payload.typeOrder===''){
                updatedCards= [...state.aux]
            }
            if(payload.typeOrder==='alphabet'){
                if(payload.order===true){
                    updatedCards=updatedCards?.sort((a,b)=> a.name.localeCompare(b.name)   )
                }
                if(payload.order===false){
                    updatedCards=updatedCards?.sort((a,b)=>b.name.localeCompare(a.name));
                }
            }
            if(payload.typeOrder==='attack'){
                if(payload.order===true){
                    updatedCards=updatedCards?.sort((a,b)=> b.attack - a.attack );
                }
                if(payload.order===false){
                    updatedCards=updatedCards?.sort((a,b)=>a.attack-b.attack);
                }
            }
            return {...state , cards:updatedCards}
        }
        case POSTVIDEOGAME: return {...state, cards:[...state.cards , payload]}
        default: return {...state};
    }
}


export default reducer