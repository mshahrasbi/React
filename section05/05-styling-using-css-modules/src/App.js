import React, { Component } from 'react';

import classes from './App.module.css';

import Person from './Person/Person';

class App extends Component {
  state = {
    Persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // const persons  = this.state.Persons.splice(); // copy the whole array
    // or use the new feature spread operator
    const persons = [...this.state.Persons];
    persons.splice(personIndex, 1);
    this.setState({Persons: persons});
  }

  nameChangedHandler = ( event, id ) => {

    const personIndex = this.state.Persons.findIndex( p => {
      return p.id === id;
    });

    // const person = Object.assign({}, this.state.Persons[personIndex]);
    // or
    const person = { ...this.state.Persons[personIndex] };
    person.name = event.target.value;

    const mypersons = [...this.state.Persons];
    mypersons[personIndex] = person;

    this.setState({ Persons: mypersons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  render () {

    let myPersons = null;
    let btnClass = '';

    if ( this.state.showPersons ) {
      myPersons = (
        <div>
          { this.state.Persons.map( (person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age} 
              key={person.id}
              changed={( event ) => this.nameChangedHandler(event, person.id)}/>
          }) }
        </div>
      );
      
      btnClass = classes.Red;
    }

    const assignedClasses = [];

    if (this.state.Persons.length <= 2) {
      assignedClasses.push(classes.red);
    } 

    if (this.state.Persons.length <= 1) {
      assignedClasses.push(classes.bold);
    }

    return (
      <div className={ classes.App }>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedClasses.join(' ')}>This is really working!</p>
        <button
          className={btnClass}
          onClick={this.togglePersonsHandler}>Toggle Persons</button>

        {myPersons}
      </div>
    );
    
  }
}

export default App;
