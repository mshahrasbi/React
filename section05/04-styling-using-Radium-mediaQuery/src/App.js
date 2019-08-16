import React, { Component } from 'react';
import Radium, { StyleRoot } from 'radium';

import './App.css';
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
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ":hover": {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let myPersons = null;

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

      style.backgroundColor = "red";
      style[":hover"] =  {
        backgroundColor: 'salmon',
        color: 'black'
      };


    }

    const classes = [];

    if (this.state.Persons.length <= 2) {
      classes.push('red');
    } 

    if (this.state.Persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>

          {myPersons}
        </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default Radium(App);
