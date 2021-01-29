
import React, { Component } from 'react';

import classes from './Modal.module.css';
import Aux from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';


class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        // here the childern of the component simply change to props.childer, changed, we are passing a new child, we are passing the spinner instead 
        // the oder summary, that does not trigger an update here. So we simply have to update this if condition 'nextProps.children !== this.props.children'
        // it does update if it gets new childern. w
        if (nextProps.show !== this.props.show || nextProps.children !== this.props.children) {
            // console.log('[Modal] shouldUpdate')
            return true;    
        }
        return false;
    }

    componentWillUpdate() {
        // console.log('[Modal] willUpdate');
    }

    render() {
        return (
                <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={
                        {
                            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                            opacity: this.props.show ? '1' : '0'
                        }
                    }>
                    {this.props.children}
                </div>
                </Aux>
            );
    }
}

export default Modal;