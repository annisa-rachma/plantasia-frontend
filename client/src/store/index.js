import {combineReducers, applyMiddleware, legacy_createStore as createStore} from "redux"
import productsReducer from "./reducers/productsReducer"
import thunk from 'redux-thunk'

const rootReducer = combineReducers({
    productsReducer : productsReducer 
})

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store