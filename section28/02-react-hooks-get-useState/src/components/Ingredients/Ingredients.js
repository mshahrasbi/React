import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients () {
  const [userIngredients, setUserIngredients ] = useState([]);

  const addIngredientHandler = ingredient => {
    setUserIngredients(prevIngredeints => [
                  ...prevIngredeints, 
                  {id: Math.random().toString(), ...ingredient} 
                ]);
  };

  return (
    <div className="App">
      <IngredientForm onAddIngredient={ addIngredientHandler }/>

      <section>
        <Search />
        <IngredientList ingredients={ userIngredients } onRemoveItem={ () => {}}/>
      </section>
    </div>
  );
}

export default Ingredients;
