
const inittialState = { counter: 0 };

const reducer = (state = inittialState, action) => {
    console.log('[Reducer] Action: ', action.type);

    switch(action.type) {
        case 'INCREMENT':
            return {
                counter: state.counter + 1
            };
        case 'DECREMENT':
            return {
                counter: state.counter - 1
            };
        case 'ADD':
            return {
                counter: state.counter + action.val
            };
        case 'SUBTRACT':
            return {
                counter: state.counter - action.val
            };
    }

    return state;
}

export default reducer;