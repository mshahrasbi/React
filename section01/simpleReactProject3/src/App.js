
import React from 'react';

import './style.css'

function App(props) {

    return (
        <div className='person'>
            <h1>{props.name}</h1>
            <p>Your Age: {props.Age}</p>
        </div>
    );
}

export default App;