import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios';

import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        orderForm : {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'fastest'},
                        {value: 'cheapest', displayValue: 'cheapest'},
                    ]
                },
                value: ''
            }
        },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log('[ContactData] orderHandler: ', this.props.ingredients);

        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        };
        axios.post('/orders.json', order)
            .then(response => {
                console.log('[ContactData] orderHandler: axios.post: ' , response); 
                this.setState({loading: false});
                this.props.history.push('/'); // this fine as long as we pass the props from checkout component to here as well
            })
            .catch(error => {
                console.log('[ContactData] orderHandler: axios.post:error: ' , error)
                this.setState({loading: false});
            });
        }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log('[ContactData] inputChangedHandler: ', event.target.value);
        
        // so here we will create temp varaible for the state.orderForm to copy
        // inputIdentifier. this is not deepcopy here since the orderForm has a
        // nested object in in there. state.orderForm.name, state.orderForm.street ,,,
        const updatedOrderForm = { ...this.state.orderForm };

        // so now get the next level of copy
        /**
         * state = {
         *   orderForm : {
         *       name: {
         *           elementType: 'input',
         *           elementConfig,
         *           value: ''
         *       },
         *       :
         */ 
        const updatedFormElement = { ...this.state.orderForm[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        this.setState({orderForm: updatedOrderForm});
    }   

    render() {
        console.log('[ContactData] render: ', this.props.ingredients);
        
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        console.log('[ContactData] render - formElementsArray: ', formElementsArray);

        let form = (
            <form>
                {
                    formElementsArray.map(
                        formElement => (
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                changed={ (event) => this.inputChangedHandler(event, formElement.id) }
                                />
                        )
                    )
                }

                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;