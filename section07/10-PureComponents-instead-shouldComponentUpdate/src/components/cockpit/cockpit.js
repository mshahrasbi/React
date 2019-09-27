
import React, { useEffect } from 'react';

import './cockpit.css';

const Cockpit = (props) => {

    useEffect(() => {
      console.log('[cockpit.js] useEffect');

      const timer = setTimeout( () => {
          alert('Save data to cloud!');
        }, 1000);

        return () => {
          clearTimeout(timer);
          console.log('[Cockpit.js] cleanup work in useEffect!');
        }
    }, []);


    useEffect(
      () => {
        console.log('[cockpit.js] 2nd useEffect');

        return () => {
          console.log('[Cockpit.js] cleanup work in 2nd useEffect!');
        }
      }
    );

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = 'Red';
    }

    if (props.personsLength <= 2) {
      assignedClasses.push('red');
    } 

    if (props.personsLength <= 1) {
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


export default React.memo(Cockpit);