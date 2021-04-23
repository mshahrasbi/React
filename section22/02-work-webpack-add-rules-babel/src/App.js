
import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import Users from './containers/users';
import asyncComponent from './higherOrderComponent/asyncComponent';


const AsyncPizza = asyncComponent( () => {
    return import('./containers/pizza.js');
});

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/">Users</Link> | 
                    <Link to="/pizza">Pizza</Link>
                </div>
                <div>
                    <Route path="/" exact component={Users} />
                    <Route path="/pizza" component={AsyncPizza} />
                </div>
            </div>
        );
    }
}