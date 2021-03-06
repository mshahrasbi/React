import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        };

        componentWillMount() {
            this.reqIntercepter = axios.interceptors.request.use(req => {
                this.setState({error: null});

                return req;
            });

            this.resIntercepter = axios.interceptors.response.use(res => res, err => {
                console.log('[withErrorHandler] err: ', err);
                this.setState({error: err});
            });
        }

        componentWillUnmount() {
            console.log('[withErrorHandler] will unmount: ', this.reqIntercepter, this.resIntercepter);
            axios.interceptors.request.eject(this.reqIntercepter);
            axios.interceptors.response.eject(this.resIntercepter);
        }

        errorConfirmedHandler= () => {
            this.setState({error: null});
        }
        
        render() {
            return (
                    <Aux>
                        <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                            {this.state.error  ? this.state.error.message : null}
                        </Modal>
        
                        <WrappedComponent {...this.props} />
        
                    </Aux>
                );
        }
    }
};


export default withErrorHandler;