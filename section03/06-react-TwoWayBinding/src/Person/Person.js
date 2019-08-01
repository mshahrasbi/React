
import React from 'react';

import './Person.css';

const Person = (props) => {
    return (
        <div className='Person'>
            <h2 onClick={props.click}>This is the Person's name {props.name} and {props.age} years old</h2>
            <p>{props.children}</p> 

            <input type='text' onChange={ props.changed } />
        </div>
    );
}

export default Person;