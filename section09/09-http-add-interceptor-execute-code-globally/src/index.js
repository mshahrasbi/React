import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

axios.interceptors.request.use( request => {
    console.log('[index.js - interceptor:Request] ' , request);

    return request;
}, error => {
    console.log('[index.js - interceptor:Request:Error] ' ,error);

    return Promise.reject(error);
});

axios.interceptors.response.use( response => {
    console.log('[index.js - interceptor:Response', response);

    return response;
}, error => {
    console.log('[index.js - interceptor"Response:Error] ' ,error);

    return Promise.reject(error);
});


ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
