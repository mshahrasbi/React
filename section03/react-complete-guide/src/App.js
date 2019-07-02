import React from 'react';

import './App.css';
import Person from './Person/Person';

function App() {
    // can use jsx syntax
    return (
      <div className='App'>
        <h1>Hello world</h1>
        <Person />
      </div>
    );

    // Or use the React.createElement()
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hello world!!!'));
}

export default App;
