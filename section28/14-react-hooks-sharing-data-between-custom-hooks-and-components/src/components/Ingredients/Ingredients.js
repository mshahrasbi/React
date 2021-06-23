import React, { useEffect, useCallback, useReducer, useMemo } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModel from '../UI/ErrorModal';
import useHttp from '../../hooks/http';


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


function Ingredients () {
  
  const [userIngredients, dispatch] = useReducer(ingredientReducer, []);

  const {isLoading, error, data, sendRequest, reqExtra, reqIndentifier, clear} = useHttp();
  
  useEffect(() => {
    if (!isLoading && !error &&  reqIndentifier === 'REMOVE_INGREDIENT') {
      dispatch({type: 'DELETE', id: reqExtra})
    } else if (!isLoading && !error && reqIndentifier === 'ADD_INGREDIENT') {
      dispatch(
        {
          type: 'ADD',
          ingredient: { id: data.name, ...reqExtra }
        }
      );
    }
  }, [data, reqExtra, reqIndentifier, isLoading, error]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    dispatch({
      type: 'SET',
      ingredients: filteredIngredients
    });
  }, []);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest('https://react-hooks-update.firebaseio.com/ingredients.json', 'POST', JSON.stringify(ingredient), ingredient, 'ADD_INGREDIENT');
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json `, 'DELETE', null, ingredientId, 'REMOVE_INGREDIENT' );
  }, [sendRequest]);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ userIngredients } onRemoveItem={ () => {removeIngredientHandler}}/>
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModel onClose={clear}>(error)</ErrorModel>}
      <IngredientForm onAddIngredient={ addIngredientHandler } loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
