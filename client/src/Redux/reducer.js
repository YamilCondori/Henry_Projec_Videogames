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
            if(payload==='todos'){
                return {...state, cards:[...state.aux], filters:[] }
            }
            if(payload==='API'){
                state.cards= state.aux.filter(pokemon=> typeof pokemon.id=== 'number')
                return {...state,  filters:[...state.filters, payload]}
            }
            if(payload==='DataBase'){
                state.cards=state.aux.filter(pokemon=> typeof pokemon.id === 'string');
                return {...state, filters:[...state.filters, payload]}
            }
            state.cards= state.aux.filter(pokemon=> pokemon?.genre.some(infoType=>infoType.type.name===payload))
            return {...state, filters:[...state.filters, payload]}
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