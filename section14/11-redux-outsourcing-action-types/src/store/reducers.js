
import * as actionTypes from './actions';

const inittialState = { counter: 0, results: [] };

const reducer = (state = inittialState, action) => {
    console.log('[Reducer] Action: ', action.type);

    switch(action.type) {
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1
            };
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.val
            };
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.val
            };
        case actionTypes.STORE_RESULT:
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
        case actionTypes.DELETE_RESULT:
            const updateArray = state.results.filter(result => result.id !== action.resultElId);
            return {
                ...state,
                results: updateArray
            }
        default:
            return state;
    }

}

export default reducer;