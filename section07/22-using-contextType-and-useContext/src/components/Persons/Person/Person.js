
import React, { Component } from 'react';
import PropTypes from 'prop-types';


import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';



import './Person.css';

class Person extends Component {
    constructor(props) {
        super(props);
        
        this.inputElementRef = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        // this.inputElementRef.focus();
        this.inputElementRef.current.focus();

        console.log('[] componentDidMount: context ', this.context.authenticated);
    }

    render() {
        console.log('[Person.js] rendering ... ');
        console.log('[Person.js] rendering: isAuth ', this.props.isAuth);
        return (
            <Aux>
                { 
                    this.context.authenticated ? <p>Authenticated!</p> : <p>Please Log In</p>
                }
                <p key='i1' onClick={ this.props.click }>I'm { this.props.name } and I am { this.props.age } years old!</p>
                <p key='i2'>{ this.props.children }</p>
                <input 
                    key='i3' 
                    type='text'
                    // ref={ (inputEl) => { this.inputElementRef = inputEl; } } 
                    ref={this.inputElementRef}
                    onChange={ this.props.changed } 
                    value={ this.props.name } />
            </Aux>
        );
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default withClass(Person, 'Person');