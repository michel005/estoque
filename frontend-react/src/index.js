import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter } from 'react-router-dom';
import AppConnector from './App';

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <AppConnector />
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);