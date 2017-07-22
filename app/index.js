/**
 * Created by zhujiaming on 17/5/20.
 */
'use strict';
import './storage/index';
import './storage/sync';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import rootReducer from './rootReducer';
import AppRoute from './routes';
import thunk from 'redux-thunk';


const rootStore = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Provider store={rootStore}>
            <AppRoute/>
        </Provider>);
    }
}

export default App;