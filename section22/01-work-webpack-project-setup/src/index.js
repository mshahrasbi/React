
import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.module.css';
import App from './app';

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
);

ReactDom.render(app, document.getElementById('root'));