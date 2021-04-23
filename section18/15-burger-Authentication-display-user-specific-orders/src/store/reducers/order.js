import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, {purchased: false});
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, {id: action.orderId});
    return updateObject(state, {                
                                    loading: false,
                                    purchased: true,
                                    orders: state.orders.concat(newOrder)
                                });
};

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, {loading: false});
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, {loading: true});
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {orders: action.orders, loading: false});
};

const fetchOrdersFailed = (state, action) => {
    return updateObject(state, {loading: false});
};


const reducer = (state = initialState, action) => {

    switch (action.type) {

        case actionTypes.PURCHASE_INIT:
            console.log('[Order Reducer] reducr: action: PURCHASE_INIT - state: ', state);
            return purchaseInit(state, action);

        case actionTypes.PURCHASE_BURGER_START:
            console.log('[Order Reducer] reducr: action: PURCHASE_BURGER_START - state: ', state);
            return purchaseBurgerStart(state, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            console.log('[Order Reducer] reducr: action: - state: ', state);
            return purchaseBurgerSuccess(state, action);

        case actionTypes.PURCHASE_BURGER_FAIL:
            console.log('[Order Reducer] reducr: action: PURCHASE_BURGER_FAIL - state: ', state);
            return purchaseBurgerFail(state, action);

        case actionTypes.FETCH_ORDERS_START:
            console.log('[Order Reducer] reducr: action: FETCH_ORDERS_START - state: ', state);
            return fetchOrdersStart(state, action);

        case actionTypes.FETCH_ORDERS_SUCCESS:
            console.log('[Order Reducer] reducr: action: FETCH_ORDERS_SUCCESS - state: ', state);
            return fetchOrdersSuccess(state, action);
        
        case actionTypes.FETCH_ORDERS_FAIL:
            console.log('[Order Reducer] reducr: action: FETCH_ORDERS_FAIL - state: ', state);
            return fetchOrdersFailed(state, action);

        default:
            return state;
    }
};


export default reducer;