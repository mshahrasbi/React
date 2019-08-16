
import React, { Component } from 'react';

class ErrorBoundary extends Component {

    state = {
        hasError: false,
        errorMessage: ''
    };

    componentDidCatch = (error, info) => {
        this.setState({
            hasError: true,
            errorMessage: error
        });

        // also can log errors in server or log files
    }

    render() {

        if (this.state.hasError){
            return <h1>{ this.state.errorMessage }</h1>
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;