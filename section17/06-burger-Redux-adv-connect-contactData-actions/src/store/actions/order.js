
import axios from 'axios';

import * as actionTypes from './actionTypes';


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    };
};


export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    };
};


export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log('[Store:actions:order] purchaseBugerStart: axios.post: ' , response); 
                dispatch(actionTypes.purchaseBurgerSuccess(response.data, orderData));
            })
            .catch(error => {
                console.log('[Store:actions:order] purchaseBugerStart: axios.post:error: ' , error);
                dispatch(purchaseBurgerFail(error));
            });
    };
};