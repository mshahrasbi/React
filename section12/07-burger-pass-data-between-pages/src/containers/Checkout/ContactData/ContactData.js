import React, { Component } from "react";

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';

import axios from '../../../axios';

import classes from './ContactData.module.css';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
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
            customer: {
                name: 'John Smith',
                address: {
                        street: '100 North Test St.',
                        zipCode: '89765',
                        country: 'USA'
                    },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
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

    render() {
        console.log('[ContactData] render: ', this.props.ingredients);

        let form = (
            <form>
                <input className={classes.Input} type='text' name='name' placeholder='Your Name'/>
                <input className={classes.Input} type='email' name='email' placeholder='Your Email'/>
                <input className={classes.Input} type='text' name='street' placeholder='Your Address Street'/>
                <input className={classes.Input} type='text' name='postal' placeholder='Your Address Postal Code'/>

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