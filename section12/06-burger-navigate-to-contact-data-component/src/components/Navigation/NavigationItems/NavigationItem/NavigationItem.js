
import React from 'react';

import myClasses from './NavigationItem.module.css';


const navigationItem = (props) => (
    <li className={myClasses.NavigationItem}>
        <a href={props.link} className={props.active ? myClasses.active : null}>{props.children}</a>
    </li>
);

export default navigationItem;