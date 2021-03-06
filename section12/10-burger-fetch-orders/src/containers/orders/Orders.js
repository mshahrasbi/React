
import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(res => {
                console.log('[Orders] componentDidMount: ', res.data);

                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }

                this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                this.setState({loading: false});
            });
    }

    render() {
        return (
            <div>
                <Order />
                <Order />
                <Order />
            </div>
        );
    }
}

export default WithErrorHandler(Orders, axios);