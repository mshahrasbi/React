
const inittialState = { counter: 0, results: [] };

const reducer = (state = inittialState, action) => {
    console.log('[Reducer] Action: ', action.type);

    switch(action.type) {
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1
            };
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            };
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.val
            };
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.val
            };
        case 'STORE_RESULT':
            console.log('[Reducer] STORE_RESULT: ', state);
            /**
             * here we can call the concat() function, which is simply like push but where push() manipulate
             * the original value, concat returns a new array which is the older array + the argument you add 
             * to concat. So it is a immutable way updating an array by adding an item
             */
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: state.counter})
            }
        default:
            return state;
    }

}

export default reducer;