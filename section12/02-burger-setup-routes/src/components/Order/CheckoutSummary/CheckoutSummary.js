
import React from 'react';

import classes from './CheckoutSummary.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.checkoutSummary}>
            <h2>We hope it tastes well!</h2>

            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            
            <Button btnType='Danger' clicked>CANCEL</Button>
            <Button btnType='Success'clicked>CONTINUE</Button>
        </div>
    );
}

export default checkoutSummary;