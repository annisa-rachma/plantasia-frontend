import { PRODUCTS_FETCH, PRODUCT_DELETE, PRODUCT_FETCH_BY_ID, PRODUCT_POST, PRODUCT_PUT } from "../actions/actionType";

const initialState = {products : [], productById : null, addedProduct: null, deletedProduct : null, editedProduct : null};

export default function productsReducer(state = initialState, action) {
    switch(action.type) {
        case PRODUCTS_FETCH :
            return {...state, products : action.payload};
        case PRODUCT_FETCH_BY_ID :
            return {...state, productById : action.payload};
        case PRODUCT_POST :
            return {...state, addedProduct : action.payload};
        case PRODUCT_DELETE :
            return {...state, deletedProduct : action.payload};
        case PRODUCT_PUT :
            return {...state, editedProduct : action.payload};
        default :
            return state
    }
}