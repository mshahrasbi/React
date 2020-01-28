
import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import myClasses from './SideDrawer.module.css';


const sideDrawer = (props) => {

    // ....

    return (
        <div className={myClasses.SideDrawer}>
            <div className={ myClasses.Logo }>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};


export default sideDrawer;