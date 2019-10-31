import React, { Component } from 'react';

import './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/cockpit/cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Auxiliary';

import AuthContext from '../context/auth-context';

class App extends Component {

  constructor(props) {
    super(props);

    console.log('[App.js] Constror Called');

  }

  state = {
    Persons: [
      { id: '1', name: 'Max', age: 28 },
      { id: '2', name: 'Manu', age: 29 },
      { id: '3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
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

    // this.setState({ Persons: mypersons, changeCounter: this.state.changeCounter + 1 });
    this.setState( (prevState, props) => {
      return {
        Persons: mypersons, 
        changeCounter: prevState.changeCounter + 1
      }
    });

  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( { showPersons: !doesShow } );
  }

  loginHandler = () => {
    console.log('[App.js] loginHandler Called');
    this.setState({authenticated: true});
    console.log('[App.js] authenticated: ', this.state.authenticated);
  }

  render () {
    console.log('[App.js] render Called');
    
    let myPersons = null;

    if ( this.state.showPersons ) {
      myPersons =  <Persons 
                      persons={this.state.Persons}
                      clicked={this.deletePersonHandler}
                      changed={this.nameChangedHandler}
                      isAuthenticated={this.state.authenticated}/>;
    }

    return (
      <Aux>
        <button onClick={() => {
          if (this.state.showCockpit){
            this.setState({showCockpit: false});
          } else {
            this.setState({showCockpit: true});
          }
        }}>Remove Cockpit</button>
        <AuthContext.Provider value={{ authenticated: this.state.authenticated, login: this.loginHandler}}>
          {this.state.showCockpit ? <Cockpit
            title={this.props.appTitle}
            showPersons={this.state.showPersons}
            personsLength={this.state.Persons.length}
            clicked={this.togglePersonsHandler}
            login={ this.loginHandler }
            /> : null}
          {myPersons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, 'App');
