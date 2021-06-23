import React, { useEffect, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModel from '../UI/ErrorModal';

function Ingredients () {
  const [userIngredients, setUserIngredients ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {error, setError} = useState();

  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    setIsLoading(true);
    fetch('https://react-hooks-update.firebaseio.com/ingredients.json' , {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'content-Type': 'application/json' }
    })
      .then( response => {
        setIsLoading(false);
        return response.json();
      })
      .then(responseData => {
        setUserIngredients(prevIngredients => [
          ...prevIngredients, 
          { id: responseData.name, ...ingredient }
        ]);
      });
  };

  const removeIngredientHandler = ingredientId => {
    setIsLoading(true);
    fetch(`https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json ` , {
      method: 'DELETE'
    })
      .then( response => {
        setIsLoading(false);
        setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <div className="App">
      {error && <ErrorModel onClose={clearError}>(error)</ErrorModel>}
      <IngredientForm onAddIngredient={ addIngredientHandler } loading={isLoading}/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={ userIngredients } onRemoveItem={ () => {removeIngredientHandler}}/>
      </section>
    </div>
  );
}

export default Ingredients;
