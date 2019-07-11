import React, { useState } from 'react';

import './App.css';
import Person from './Person/Person';

const App = (props) => {

  const [ personState, setPersonState ] = useState(
    {
      Person: [
        { name: 'Mo', age: 29 },
        { name: 'Manu', age: 20 },
        { name: 'Joe', age: 30 }
      ]
    }    
  );

  const switchCaseHandler = () => {
    console.log('Was clicked');
    setPersonState(
      {
        Person: [
          { name: 'Mj', age: 29 },
          { name: 'Manu', age: 20 },
          { name: 'Mark', age: 40 }
        ]
      }
    );
  }

  return (
      <div className='App'>
        <h1>Hello world</h1>
        <button onClick={switchCaseHandler}>Switch Name</button>
        <Person name={personState.Person[0].name} age={personState.Person[0].age}/>
        <Person name={personState.Person[1].name} age={personState.Person[1].age}>Hobbies: Racing</Person>
        <Person name={personState.Person[2].name} age={personState.Person[2].age}/>
      </div>
    );
}

export default App;

