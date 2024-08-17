import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"

import cartReducers from "../reducers/cartReducer"
import productReducers from "../reducers/productReducer"

const configureStore = () => {
    const store = createStore(combineReducers({
        cart:cartReducers,
        products:productReducers,
    }), applyMiddleware(thunk))

    return store
}

export default configureStore