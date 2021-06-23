import React, { useEffect, useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients () {
  const [userIngredients, setUserIngredients ] = useState([]);


  useEffect(() => {
    fetch('https://react-hooks-update.firebaseio.com/ingredients.json')
    .then(response => response.json())
    .then(responseData => {
      const loadedIngredients = [];

      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount
        });
      }

      setUserIngredients(loadedIngredients);
    });    
  }, []);

  
  useEffect(() => {
    console.log('Rendering Ingredients', userIngredients)
  }, [userIngredients]);

  const filteredIngredientsHandler = filteredIngredients => {
    setUserIngredients(filteredIngredients);
  };

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
