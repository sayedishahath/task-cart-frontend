import { createStore, combineReducers, applyMiddleware } from "redux"
import { thunk } from "redux-thunk"

import cartReducers from "../reducers/cartReducer"

const configureStore = () => {
    const store = createStore(combineReducers({
        cart:cartReducers,
    }), applyMiddleware(thunk))

    return store
}

export default configureStore