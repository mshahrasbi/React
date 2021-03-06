
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary'

import axios from '../../axios';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


import * as actions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    };

    componentDidMount() {
        // console.log('[BurgerBuilder] componentDidMount: ', this.props);
        this.props.onInitIngredients();
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
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.props.ings) {
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

        // console.log('[BurgerBuilder] render:disabledInfo: ',disabledInfo);

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
        price: state.totalPrice,
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredeintAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredeintRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit())
    };
};

export  default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));