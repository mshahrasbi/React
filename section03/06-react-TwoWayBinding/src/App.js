import React, { Component } from 'react';

import './App.css';
import Person from './Person/Person';


class App extends Component {

  state = {
    persons: [
      { name: 'Mo', age: 29 },
      { name: 'Manu', age: 20 },
      { name: 'Joe', age: 30 }
    ]
  };


  switchNameHandler = (newName) => {
    console.log('Was clicked');
    this.setState(
      {
        persons: [
          { name: newName, age: 29 },
          { name: 'Manu', age: 20 },
          { name: 'Mark', age: 40 }
        ]
      }
    );
  }

  nameChangedHandler = (event) => {
    this.setState(
      {
        persons: [
          { name: 'Mo', age: 29 },
          { name: event.target.value, age: 20 },
          { name: 'Mark', age: 40 }
        ]
      }
    );
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    return (
      <div className='App'>
        <h1>Hello world</h1>
        <button style={style} onClick={ () => this.switchNameHandler('Mohammad') }>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}/>

        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler.bind(this, 'Majeed') }
          changed={this.nameChangedHandler}>Hobbies: Racing</Person>

        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}/>
      </div>
    );
  }

}

export default App;

