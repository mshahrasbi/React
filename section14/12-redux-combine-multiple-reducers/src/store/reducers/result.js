
import * as actionTypes from '../actions';

const inittialState = { results: [] };

const reducer = (state = inittialState, action) => {
    console.log('[Reducer] Action: ', action.type);

    switch(action.type) {
        case actionTypes.STORE_RESULT:
            console.log('[Reducer] STORE_RESULT: ', state);
            /**
             * here we can call the concat() function, which is simply like push but where push() manipulate
             * the original value, concat returns a new array which is the older array + the argument you add 
             * to concat. So it is a immutable way updating an array by adding an item
             */
            return {
                ...state,
                results: state.results.concat({id: new Date(), value: action.result})
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