
import * as actionTypes from './actions';

const initialState = {
    persons: []
};

const reducer = (state = initialState, action) => {

    if(action.type === actionTypes.ADD_PERSON) {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: action.personData.name,
            age: action.personData.age
        };

        return {
            ...state,
            persons: state.persons.concat(newPerson)
        };
    }

    if (action.type === actionTypes.DELETE_PERSON) {
        return {
            ...state,
            persons: state.persons.filter(person => person.id !== action.personId)
        };
    }



    return state;

};

export default reducer;