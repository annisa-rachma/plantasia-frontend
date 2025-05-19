import { CATEGORIES_FETCH, CATEGORY_DELETE, CATEGORY_FETCH_BY_ID, CATEGORY_POST, CATEGORY_PUT } from "../actions/actionType";

const initialState = {categories : [], categoryById : null, addedCategory : null, editedCategory: null, deletedCategory: null};

export default function categoryReducer(state = initialState, action) {
    switch(action.type) {
        case CATEGORIES_FETCH :
            return {...state, categories : action.payload};
        case CATEGORY_FETCH_BY_ID :
            return {...state, categoryById : action.payload};
        case CATEGORY_POST :
            return {...state, addedCategory : action.payload};
        case CATEGORY_PUT :
            return {...state, editedCategory : action.payload}; 
        case CATEGORY_DELETE :
            return {...state, deletedCategory : action.payload};     
        default :
            return state
    }
}