import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients () {
  const [userIngredients, setUserIngredients ] = useState([]);

  const addIngredientHandler = ingredient => {
    fetch('https://react-hooks-update.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: {'content-type': 'application/json'}
    }).then( repsonse => {
      return Response.json();
    }).then( responseDate => {
      setUserIngredients(prevIngredeints => [
        ...prevIngredeints, 
        {id: responseData.name, ...ingredient} 
      ]);
    });
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
