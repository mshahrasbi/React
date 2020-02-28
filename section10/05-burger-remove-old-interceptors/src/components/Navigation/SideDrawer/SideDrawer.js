
import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import myClasses from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop'
import Aux from '../../../hoc/Auxiliary';


const sideDrawer = (props) => {

    let attachedClasses = [myClasses.SideDrawer, myClasses.Close];

    if (props.open) {
        attachedClasses = [myClasses.SideDrawer, myClasses.Open];
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className={ myClasses.Logo }>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    );
};


export default sideDrawer;