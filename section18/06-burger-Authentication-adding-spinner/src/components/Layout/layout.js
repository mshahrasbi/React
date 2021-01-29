
import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import classes from './layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: true
    }

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        // this.setState({ showSideDrawer: !this.state.showSideDrawer }); // this is an issue in asyncrounous update
        // you should use this:
        this.setState( (prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    }

    render() {
        return (
            <Aux>
            <Toolbar drawerToggleClicked={ this.sideDrawerToggleHandler } />
            <SideDrawer open={ this.state.showSideDrawer } closed={ this.sideDrawerClosedHandler }/>
            <main className={classes.Content}>
                {this.props.children}
            </main>
        </Aux>
    
        );
    }
}

export default Layout;