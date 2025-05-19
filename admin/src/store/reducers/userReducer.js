
import { USER_LOGIN, USER_REGISTER } from "../actions/actionType";

const initialState = {user : null};

export default function userReducer(state = initialState, action) {
    switch(action.type) {
        case USER_LOGIN:
            return {...state, user : action.payload};
        case USER_REGISTER:
            return {...state, user : action.payload};
        default :
            return state
    }
}