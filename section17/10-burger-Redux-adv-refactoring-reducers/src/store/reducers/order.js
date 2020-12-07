
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT:
            console.log('[Order Reducer] reducr: action: PURCHASE_INIT - state: ', state);
            return {
                ...state,
                purchased: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            console.log('[Order Reducer] reducr: action: PURCHASE_BURGER_START - state: ', state);
            return {
                ...state,
                loading: true
            };

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            console.log('[Order Reducer] reducr: action: - state: ', state);
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };

            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            };

        case actionTypes.PURCHASE_BURGER_FAIL:
            console.log('[Order Reducer] reducr: action: PURCHASE_BURGER_FAIL - state: ', state);
            return {
                ...state,
                loading: false
            };

        case actionTypes.FETCH_ORDERS_START:
            console.log('[Order Reducer] reducr: action: FETCH_ORDERS_START - state: ', state);
            return {
                ...state,
                loading: true
            };

        case actionTypes.FETCH_ORDERS_SUCCESS:
            console.log('[Order Reducer] reducr: action: FETCH_ORDERS_SUCCESS - state: ', state);
            return {
                ...state,
                orders: action.orders,
                loading: false
            };
        
        case actionTypes.FETCH_ORDERS_FAIL:
            console.log('[Order Reducer] reducr: action: FETCH_ORDERS_FAIL - state: ', state);
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }
};


export default reducer;