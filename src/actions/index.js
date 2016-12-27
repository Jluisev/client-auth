import axios from 'axios';
import {browserHistory} from 'react-router';
import {AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_SUCCESS} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({email, password}) {
//Submit email/password to the server
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signin`, {email, password})
            .then(respone=> {
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', respone.data.token);
                browserHistory.push('/feature');
            })
            .catch(err=> {

                dispatch(authError('Bad Login Info'));
            });
    }
}
export function signupUser({email, password}) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/signup`, {email, password})
            .then(response=>{
                dispatch({type: AUTH_USER});
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(response=>dispatch({type: AUTH_ERROR, payload: response.message}));
    }
}
export function authError(error){
    return{
        type: AUTH_ERROR,
        payload: error
    }
}
export function signoutUser() {
    localStorage.removeItem('token');

    return{
        type: UNAUTH_USER
    }
}
export function fetchMessage() {
    return function(dispatch){
        axios.get(ROOT_URL, {headers: {authorization: localStorage.getItem('token')}})
            .then(response=>{
                dispatch({type: FETCH_SUCCESS, payload: response.data.message})
            })
            .catch(respose=>{
                console.log(response.message);
            });
    }
}