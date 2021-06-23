import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModel from '../UI/ErrorModal';


const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case 'SET':
      return action.ingredientsl
    case 'ADD':
      return [...currentIngredients, action.ingredient];
    case 'DELETE':
      return currentIngredients.filter( ing => ing.id !== action.id);
    default:
      throw new Error('Should not get reached!');  
  }
};

const httpReducer = (curHttp, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null
      };
    case 'RESPONSE':
      return {
        ...curHttp,
        loading: false,
      };
    case 'ERROR':
      return {
        loading: false,
        error: action.errorMessage
      };
    case 'CLEAR':
      return {
        ...curHttp,
        error: null
      }
    default:
      throw new Error('Should not get reached!');
  }
};

function Ingredients () {
  
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading: false, error: null});

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    });
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttp({
      type: 'SEND'
    });
    fetch('https://react-hooks-update.firebaseio.com/ingredients.json' , {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'content-Type': 'application/json' }
    })
      .then( response => {
        dispatchHttp({
          type: 'RESPONSE'
        });
        return response.json();
      })
      .then(responseData => {
        dispatch({
          type: 'ADD',
          ingredient: {
            id: responseData.name,
            ...ingredient
          }
        });
      });
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    dispatchHttp({
      type: 'SEND'
    });
    fetch(`https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json ` , {
      method: 'DELETE'
    })
      .then( response => {
        dispatchHttp({
          type: 'RESPONSE'
        });
        dispatch({
          type: 'DELETE',
          id: ingredientId 
        });
      })
      .catch(error => {
        dispatchHttp({
          type: 'ERROR',
          errorMessage: 'Something went wrong!'
        });
      });
  }, []);

  const clearError = useCallback(() => {
    dispatchHttp({
      type: 'CLEAR'
    });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ userIngredients } onRemoveItem={ () => {removeIngredientHandler}}/>
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {httpState.error && <ErrorModel onClose={clearError}>(httpState.error)</ErrorModel>}
      <IngredientForm onAddIngredient={ addIngredientHandler } loading={httpState.loading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
