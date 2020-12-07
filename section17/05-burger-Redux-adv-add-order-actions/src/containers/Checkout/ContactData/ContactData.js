import React, { Component } from "react";
import { connect } from 'react-redux';

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
                valueType: 'Name',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            street: {
                elementType: 'input',
                valueType: 'Street',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            zipCode: {
                elementType: 'input',
                valueType: 'Zip Code',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false,
                value: ''
            },
            country: {
                elementType: 'input',
                valueType: 'Country Code',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            email: {
                elementType: 'input',
                valueType: 'Email Address',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
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
                validation: {},
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false,
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        console.log('[ContactData] orderHandler: ', this.props.ings);

        this.setState({loading: true});

        // here we are interested to have the data that is in state to be reformated as (name , value)
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        };

        console.log('[ContactData] orderHandler- order: ', order);

    }

    checkValidity(value, rules) {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // console.log('[ContactData] inputChangedHandler: ', event.target.value);
        
        // so here we will create temp varaible for the state.orderForm to copy
        // inputIdentifier. this is not deepcopy here since the orderForm has a
        // nested object in in there. state.orderForm.name, state.orderForm.street ,,,
        const updatedOrderForm = { ...this.state.orderForm };

        const updatedFormElement = { ...this.state.orderForm[inputIdentifier] };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }   

    render() {
        console.log('[ContactData] render: ', this.props.ings);
        
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        console.log('[ContactData] render - formElementsArray: ', formElementsArray);

        let form = (
            <form onSubmit={ this.orderHandler }>
                {
                    formElementsArray.map(
                        formElement => (
                            <Input 
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                valueType={formElement.config.valueType}
                                changed={ (event) => this.inputChangedHandler(event, formElement.id) }
                                />
                        )
                    )
                }

                <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

export default connect(mapStateToProps)(ContactData);