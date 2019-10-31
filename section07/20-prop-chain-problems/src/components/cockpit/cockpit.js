
import React, { useEffect, useRef } from 'react';

import './cockpit.css';

const Cockpit = (props) => {

    const toggleButtonRef = useRef(null);

    useEffect(() => {
      console.log('[cockpit.js] useEffect');

      // const timer = setTimeout( () => {
      //     alert('Save data to cloud!');
      //   }, 1000);

      toggleButtonRef.current.click();
      
        return () => {
          //clearTimeout(timer);
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
                    ref={toggleButtonRef}
                    className={btnClass}
                    onClick={props.clicked}>Toggle Persons</button>

                    <button onClick={props.login}>Log In</button>
            </div>
    )}; 


export default React.memo(Cockpit);