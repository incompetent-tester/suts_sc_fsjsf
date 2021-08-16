import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { AppStore } from './states/Store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'

ReactDOM.render(
    <Provider store={AppStore}>
        <App />
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
