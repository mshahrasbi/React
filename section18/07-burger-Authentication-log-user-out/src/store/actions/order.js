
import axios from '../../axios-orders';

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

export const purchaseBugerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBugerStart());
        axios.post('/orders.json', orderData)
            .then(response => {
                console.log('[Store:actions:order] purchaseBugerStart: axios.post: ' , response); 
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                console.log('[Store:actions:order] purchaseBugerStart: axios.post:error: ' , error);
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    };
};


export const fetchOrdersSuccess = (orders) => {
    console.log('[actions:Order] fetchOrdersSuccess: ', orders);
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    console.log('[actions:Order] fetchOrdersFail: ', error);
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    console.log('[actions:Order] fetchOrdersStart ');
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    console.log('[actions:Order] fetchOrders: ');
    return dispatch => {
        dispatch(fetchOrdersStart()); // start the spinner as well
        axios.get('/orders.json')
            .then(res => {

                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                console.log('[actions:Order] fetchedOrders: ', fetchedOrders);
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });

    };
};