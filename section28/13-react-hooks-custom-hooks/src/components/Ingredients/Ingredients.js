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

  const {isLoading, error, data, sendRequest} = useHttp();
  
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
    // dispatchHttp({
    //   type: 'SEND'
    // });
    // fetch('https://react-hooks-update.firebaseio.com/ingredients.json' , {
    //   method: 'POST',
    //   body: JSON.stringify(ingredient),
    //   headers: { 'content-Type': 'application/json' }
    // })
    //   .then( response => {
    //     dispatchHttp({
    //       type: 'RESPONSE'
    //     });
    //     return response.json();
    //   })
    //   .then(responseData => {
    //     dispatch({
    //       type: 'ADD',
    //       ingredient: {
    //         id: responseData.name,
    //         ...ingredient
    //       }
    //     });
    //   });
  }, []);

  const removeIngredientHandler = useCallback(ingredientId => {
    sendRequest(`https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json `, 'DELETE' );
  }, [sendRequest]);

  const clearError = useCallback(() => {
    // dispatchHttp({
    //   type: 'CLEAR'
    // });
  }, []);

  const ingredientList = useMemo(() => {
    return (
      <IngredientList ingredients={ userIngredients } onRemoveItem={ () => {removeIngredientHandler}}/>
    );
  }, [userIngredients, removeIngredientHandler]);

  return (
    <div className="App">
      {error && <ErrorModel onClose={clearError}>(error)</ErrorModel>}
      <IngredientForm onAddIngredient={ addIngredientHandler } loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
