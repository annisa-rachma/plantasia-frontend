import { PRODUCTS_FETCH, PRODUCT_FETCH_BY_ID } from "../actions/actionType";

const initialState = {products : [], productById : null};

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case PRODUCTS_FETCH :
            return {...state, products : action.payload};
        case PRODUCT_FETCH_BY_ID :
            return {...state, productById : action.payload}
        default :
            return state
    }
}