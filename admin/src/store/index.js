import {combineReducers, applyMiddleware, legacy_createStore as createStore} from "redux"
import thunk from 'redux-thunk'
import categoryReducer from "./reducers/categoryReducer"
import productsReducer from "./reducers/productReducer"
import userReducer from "./reducers/userReducer"
const rootReducer = combineReducers({
    userReducer: userReducer,
    productsReducer : productsReducer,
    categoryReducer : categoryReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk))

export default store