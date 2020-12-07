
import React from 'react';
import { NavLink } from 'react-router-dom';

import myClasses from './NavigationItem.module.css';


const navigationItem = (props) => (
    <li className={myClasses.NavigationItem}>
        <NavLink 
            to={props.link}
            exact={props.exact} 
            activeClassName={myClasses.active}>{props.children}</NavLink>
    </li>
);

export default navigationItem;