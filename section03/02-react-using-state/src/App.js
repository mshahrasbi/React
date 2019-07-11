import React, {Component} from 'react';

import './App.css';
import Person from './Person/Person';

class App extends Component {
    
  state = {
    Person: [
      { name: 'Mo', age: 29 },
      { name: 'Manu', age: 20 },
      { name: 'Joe', age: 30 }
    ]
  };

  switchCaseHandler = () => {
    console.log('Was clicked');
    this.setState(
      {
        Person: [
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
        <button onClick={this.switchCaseHandler}>Switch Name</button>
        <Person name={this.state.Person[0].name} age={this.state.Person[0].age}/>
        <Person name={this.state.Person[1].name} age={this.state.Person[1].age}>Hobbies: Racing</Person>
        <Person name={this.state.Person[2].name} age={this.state.Person[2].age}/>
      </div>
    );
  }

}

export default App;
