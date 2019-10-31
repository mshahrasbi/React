
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';


import Aux from '../../../hoc/Auxiliary';
import withClass from '../../../hoc/withClass';


import './Person.css';

class Person extends Component {

    componentDidMount() {
        this.inputElementRef.focus();
    }

    render() {
        console.log('[Person.js] rendering ... ');

        return (
            <Aux>
                <p key='i1' onClick={ this.props.click }>I'm { this.props.name } and I am { this.props.age } years old!</p>
                <p key='i2'>{ this.props.children }</p>
                <input 
                    key='i3' 
                    type='text'
                    ref={ (inputEl) => { this.inputElementRef = inputEl; } } 
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