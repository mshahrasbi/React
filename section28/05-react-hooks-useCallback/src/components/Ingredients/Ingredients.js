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
  
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={ addIngredientHandler }/>

      <section>
        <Search onLoadIngredients={filteredIngredientsHandler}/>
        <IngredientList ingredients={ userIngredients } onRemoveItem={ () => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
