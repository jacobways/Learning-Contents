import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER
} from './types';

export function loginUser (dataToSubmit) {
    const request = axios.post('api/users/login', dataToSubmit)
    .then(response => response.data)
 
    // Action은 type과 response 넣어줘야함
    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function registerUser (dataToSubmit) {
    const request = axios.post('api/users/register', dataToSubmit)
    .then(response => response.data)
 
    // Action은 type과 response 넣어줘야함
    return {
        type: REGISTER_USER,
        payload: request
    }
}