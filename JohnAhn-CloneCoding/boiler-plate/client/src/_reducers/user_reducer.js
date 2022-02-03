import {
    LOGIN_USER, REGISTER_USER
} from '../_actions/types';

// reducer : (previousState, action) => nextState

export default function (state = {}, action) {

    // 다양한 타입에 따라 처리를 해주기 위해 switch 사용
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            return {...state, register: action.payload}
            break;
        default:
            return state;
    }
}