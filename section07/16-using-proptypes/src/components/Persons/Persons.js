// Persons can be a functional component because we don't plan on managing state here.

import React, {
    PureComponent
} from 'react';

import Person from './Person/Person';

class Persons extends PureComponent {

    // shouldComponentUpdate(nextProps, nextState) {
    //         console.log('[Persons.js] shouldComponentUpdate ... ');

    //         if (nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed || nextProps.clicked !== this.props.clicked) {
    //                 return true;
    //         } else {
    //                 return false;
    //         }
    // }

    componentWillUnmount() {
            console.log('[Persons.js] componentWillUnmount ...')
    }
    
    getSnapshotBeforeUpdate(prevProps, prevState) {
            console.log('[Persons.js] getSnapshotBeforeUpdate ... ');   
            return { message: 'snapshot' };             
    }

    render() {
            console.log('[Persons.js] rendering ... ');

            return this.props.persons.map((person, index) => {
                    return (< Person click={
                            () => this.props.clicked(index)
                    }
                            name={
                                    person.name
                            }
                            age={
                                    person.age
                            }
                            key={
                                    person.id
                            }
                            changed={
                                    (event) => this.props.changed(event, person.id)
                            }
                    />);
            });
    }

    // it was removed in new version
    // componentWillReceiveProps(props) {
    //         console.log('[Persons.js] componentWillReceiveProps', props);  
    // }
    // componentWillUpdate() {
    // }

    componentDidUpdate(prevProps, prevState, snapshot) {
            console.log('[Persons.js] componentDidUpdate ... ');  
            console.log(snapshot);                              
    }
}

export default React.memo(Persons);