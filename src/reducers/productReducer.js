const initialState={
    data:[],
    serverErrors:[]
}
export default function productReducers(state=initialState,action){
    switch(action.type){
        case "GET_PRODUCTS" : {
            return {...state,data: action.payload }
        }
        default:{
            return state
        }
    }
}
