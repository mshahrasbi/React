
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        console.log('[BurgerBuilder] componentDidMount: ', this.props);

        axios.get('https://react-my-burger-67793.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({
                    ingredients: response.data
                });
            })
            .catch( error => {
                this.setState({error: true});
            });
    }

    updatePurchaseState(ingredients) {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        return sum > 0
    }

    purchaseHandler = () => {

        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {

        //this.props.history.push('/checkout');

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totlalPrice);
        
        const queryString = queryParams.join('&');
        
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            orderSummary =  <OrderSummary 
                                    ingredients={this.props.ings}
                                    price={this.props.price}
                                    purchaseCancelled={this.purchaseCancelHandler}
                                    purchaseContinued={this.purchaseContinueHandler}/>

            console.log('[BurgerBuilder] render:Props:  ',this.props);

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls 
                        ingredientAdded={this.props.onIngredeintAdded}
                        ingredientRemoved={this.props.onIngredeintRemoved}
                        disabled={disabledInfo}
                        purchasable={ this.updatePurchaseState(this.props.ings) }
                        ordered={this.purchaseHandler}
                        price={this.props.price}/>
    ]           </Aux>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        console.log('[BurgerBuilder] render: ',disabledInfo);

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps =  state => {
    console.log('[BurgerBuilder] mapStateToProps:  ',state);
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredeintAdded: (ingName) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredeintRemoved: (ingName) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        }),
    };
};

export  default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));