
const redux = require('redux');

// Reducer
const initialState = {
    counter: 0
};
const rootReducer = (curState = initialState, action) => {

    if (action.type === 'INC_COUNTER') {
        return {...curState, counter: curState.counter + 1};
    }

    if (action.type === 'ADD_COUNTER'){
        return {...curState, counter: curState.counter + action.value};
    }
    return curState;
}

// Store
const createStore = redux.createStore;
const store = createStore(rootReducer)
console.log(store.getState());


// Dispatching Action
store.dispatch({type: 'INC_COUNTER'});
console.log(store.getState());
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());

// Subscription



