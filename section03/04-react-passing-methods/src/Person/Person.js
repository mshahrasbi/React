
import React from 'react';


const Person = (props) => {
    return (
        <div>
            <h2 onClick={props.click}>This is the Person's name {props.name} and {props.age} years old</h2>
            <p>{props.children}</p>
        </div>
    );
}

export default Person;