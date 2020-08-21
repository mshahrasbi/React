
const redux = require('redux');

// Reducer
const initialState = {
    counter: 0
};
const rootReducer = (curState = initialState, action) => {
    return curState;
}

// Store
const createStore = redux.createStore;
const store = createStore(rootReducer)

console.log(store.getState());


// Dispatching Action


// Subscription



