
import axios from 'axios';

import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};


export const auth = (email, password, isSignup) => {
    return dispatch => {
        // for now
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9G4aujqy7S2W5ZAa165kjgiKX14ZzNi4';
        
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9G4aujqy7S2W5ZAa165kjgiKX14ZzNi4';
        }

        axios
            .post(url, authData)
            .then(response => {
                console.log('[Store:Actions:Auth] Success: ', response);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
            })
            .catch(err => {
                console.log('[Store:Actions:Auth] Error: ', err);
                dispatch(authFail(err));
            })
    };
};