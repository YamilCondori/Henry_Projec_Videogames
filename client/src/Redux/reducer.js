import { SEARCHBYNAME, GETVIDEOGAMES, GETGENRE, FILTER, ORDER, POSTVIDEOGAME } from "./actionTypes"

const initialState={
    cards:[],
    genres:[],
    aux:[],
    sortOrder: {}
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
            let sorted=[];
            if(payload.AtoZ && !payload.ZtoA){
                sorted = [...state.cards].sort((a,b)=> a.name.localeCompare(b.name));
            } else if(payload.AtoZ && payload.ZtoA){
                sorted = [...state.cards].sort((a,b)=> b.name.localeCompare(a.name));
            }

            if(payload.ratingAsc && !payload.ratingDesc){
                sorted = [...state.cards].sort((a,b)=> b.rating - a.rating);
            } else if(payload.ratingAsc && payload.ratingDesc){
                sorted = [...state.cards].sort((a,b)=> a.rating - b.rating);
            }

            if(!Object.values(payload).some(value=>value===true)){
                sorted = state.aux
            }

            return {...state , sortOrder:payload, cards: sorted}
        }
        case POSTVIDEOGAME: return {...state, cards:[...state.cards , payload]}
        default: return {...state};
    }
}


export default reducer