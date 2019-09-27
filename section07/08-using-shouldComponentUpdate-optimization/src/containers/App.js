import React, { Component } from 'react';

import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/cockpit/cockpit';

class App extends Component {

  constructor(props) {
    super(props);

    console.log('[App.js] Constror Called');

  // can init the state in constructor, but the modern JS will it can be outside of constructor
    // this.state = {
    //   Persons: [
    //     { id: '1', name: 'Max', age: 28 },
    //     { id: '2', name: 'Manu', age: 29 },
    //     { id: '3', name: 'Stephanie', age: 26 }
    //   ],
    //   otherState: 'some other value',
    //   showPersons: false
    // }

  }

  state = {
    Persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true
  }

  static getDerivedStateFromProps(props, state) {

    console.log('[App.js] getDerivedStateFromProps Called', props);

    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount Called');
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log('[App.js] shouldComponentUpdate Called');
    return true; // allow the update
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate Called');
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
    console.log('[App.js] render Called');
    let myPersons = null;

    if ( this.state.showPersons ) {
      myPersons =  <Persons 
                      persons={this.state.Persons}
                      clicked={this.deletePersonHandler}
                      changed={this.nameChangedHandler}/>;
    }

    return (
      <div className={'App'}>
        <button onClick={() => {
          if (this.state.showCockpit){
            this.setState({showCockpit: false});
          } else {
            this.setState({showCockpit: true});
          }
        }}>Remove Cockpit</button>
        {this.state.showCockpit ? <Cockpit
          title={this.props.appTitle}
          showPersons={this.state.showPersons}
          persons={this.state.Persons}
          clicked={this.togglePersonsHandler}/> : null}
        {myPersons}
      </div>
    );
  }
}

export default App;
