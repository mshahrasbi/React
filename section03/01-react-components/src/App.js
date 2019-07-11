import React from 'react';

import './App.css';
import Person from './Person/Person';

function App() {
    // can use jsx syntax
    return (
      <div className='App'>
        <h1>Hello world</h1>
        <Person name='Mohammad' age='29'/>
        <Person name='Manu' age='27'>Hobbies: Racing</Person>
        <Person name='Joe' age='30'/>
      </div>
    );

    // Or use the React.createElement()
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello world!!!'));
}

export default App;
