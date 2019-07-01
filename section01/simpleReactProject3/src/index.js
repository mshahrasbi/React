
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

var app = (
    <div>
        <App name='Mo' Age='35' />
        <App name='mah' Age='25' />
        <App name='Mj' Age='36' />
    </div>

);

ReactDOM.render(app, document.querySelector('#root'));