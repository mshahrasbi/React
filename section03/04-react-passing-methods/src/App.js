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


  switchNameHandler = () => {
    console.log('Was clicked');
    this.setState(
      {
        persons: [
          { name: 'Mj', age: 29 },
          { name: 'Manu', age: 20 },
          { name: 'Mark', age: 40 }
        ]
      }
    );
  }

  render() {
    return (
      <div className='App'>
        <h1>Hello world</h1>
        <button onClick={ this.switchNameHandler }>Switch Name</button>
        <Person 
          name={this.state.persons[0].name} 
          age={this.state.persons[0].age}/>

        <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age}
          click={this.switchNameHandler}>Hobbies: Racing</Person>

        <Person 
          name={this.state.persons[2].name} 
          age={this.state.persons[2].age}/>
      </div>
    );
  }

}

export default App;

