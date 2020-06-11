
import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary'

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totlalPrice: 4,
        purchaseable: false,
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
        
        this.setState({purchaseable: sum > 0})
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount =  oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totlalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({totlalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0 ) {
            return;
        }
        const updatedCount =  oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction= INGREDIENT_PRICES[type];
        const oldPrice = this.state.totlalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({totlalPrice: newPrice, ingredients: updatedIngredients});

        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {

        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // alert('You continue!');

        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.totlalPrice,
        //     customer: {
        //         name: 'John Smith',
        //         address: {
        //                 street: '100 North Test St.',
        //                 zipCode: '89765',
        //                 country: 'USA'
        //             },
        //         email: 'test@test.com'
        //     },
        //     deliveryMethod: 'fastest'
        // };
        // axios.post('/orders.json', order)
        //     .then(response => {
        //         console.log(response); 
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.setState({loading: false, purchasing: false});
        //     });

        this.props.history.push('/checkout');

    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />

        if (this.state.ingredients) {
            orderSummary =  <OrderSummary 
                                    ingredients={this.state.ingredients}
                                    price={this.state.totlalPrice.toFixed(2)}
                                    purchaseCancelled={this.purchaseCancelHandler}
                                    purchaseContinued={this.purchaseContinueHandler}/>

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        price={this.state.totlalPrice}/>
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

export  default WithErrorHandler(BurgerBuilder, axios);