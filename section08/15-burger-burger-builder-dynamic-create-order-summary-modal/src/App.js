import React, { Component } from 'react';

import Layout from '../src/components/Layout/layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder>
            <p>Test</p>
          </BurgerBuilder>
        </Layout>
      </div>
    );
  }

}

export default App;
