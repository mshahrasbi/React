
import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import myClasses from './SideDrawer.module.css';


const sideDrawer = (props) => {

    // ....

    return (
        <div className={myClasses.SideDrawer}>
            <Logo/>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    );
};


export default sideDrawer;