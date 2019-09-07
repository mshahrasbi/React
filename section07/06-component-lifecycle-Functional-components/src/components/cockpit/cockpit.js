
import React, { useEffect } from 'react';

import './cockpit.css';

const Cockpit = (props) => {

    // useEffect(() => {
    //   console.log('[cockpit.js] useEffect');

    //   setTimeout( () => {
    //       alert('Save data to cloud!');
    //     }, 1000);
    // }, [props.persons]);

    useEffect(() => {
      console.log('[cockpit.js] useEffect');

      setTimeout( () => {
          alert('Save data to cloud!');
        }, 1000);
    }, []);

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = 'Red';
    }

    if (props.persons.length <= 2) {
      assignedClasses.push('red');
    } 

    if (props.persons.length <= 1) {
      assignedClasses.push('bold');
    }


    return (
            <div className={'Cockpit'}>
                <h1>{props.title}</h1>
                <p className={assignedClasses.join(' ')}>This is really working!</p>
                <button
                    className={btnClass}
                    onClick={props.clicked}>Toggle Persons</button>
            </div>
    )}; 


export default Cockpit;