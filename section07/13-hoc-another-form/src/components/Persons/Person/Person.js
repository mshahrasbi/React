
import React, { Component, Fragment } from 'react';

import Aux from '../../../hoc/Auxiliary';


import './Person.css';

class Person extends Component {

    render() {
        console.log('[Person.js] rendering ... ');

        // return [
        //     <p key='i1' onClick={ this.props.click }>I'm { this.props.name } and I am { this.props.age } years old!</p>,
        //     <p key='i2'>{ this.props.children }</p>,
        //     <input key='i3' type='text' onChange={ this.props.changed } value={ this.props.name } />
        // ];
        return (
            <Aux>
                <p key='i1' onClick={ this.props.click }>I'm { this.props.name } and I am { this.props.age } years old!</p>
                <p key='i2'>{ this.props.children }</p>
                <input key='i3' type='text' onChange={ this.props.changed } value={ this.props.name } />
            </Aux>
        );
        // return (
        //     <Fragment>
        //         <p key='i1' onClick={ this.props.click }>I'm { this.props.name } and I am { this.props.age } years old!</p>
        //         <p key='i2'>{ this.props.children }</p>
        //         <input key='i3' type='text' onChange={ this.props.changed } value={ this.props.name } />
        //     </Fragment>
        // );


    }
}

export default Person;