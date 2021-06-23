import React, { useEffect, useState, useCallback } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients () {
  const [userIngredients, setUserIngredients ] = useState([]);


  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients]);

  const filteredIngredientsHandler = useCallback(filteredIngredients => {
    setUserIngredients(filteredIngredients);
  }, []);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update.firebaseio.com/ingredients.json' , {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: { 'content-Type': 'application/json' }
    })
      .then( response => {
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
    fetch(`https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json ` , {
      method: 'DELETE'
    })
      .then( response => {
        setUserIngredients(prevIngredients => prevIngredients.filter(ingredient => ingredient.id !== ingredientId));
      });
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={ addIngredientHandler }/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={ userIngredients } onRemoveItem={ () => {removeIngredientHandler}}/>
      </section>
    </div>
  );
}

export default Ingredients;
