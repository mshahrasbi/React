
import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const auth = (email, password) => {
    return dispatch => {
        // for now
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        axios
            .post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9G4aujqy7S2W5ZAa165kjgiKX14ZzNi4', authData)
            .then(response => {
                console.log('[Store:Actions:Auth] Success: ', response);
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log('[Store:Actions:Auth] Error: ', err);
                dispatch(authFail(err));
            })
    };
};