import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import {ApolloProvider } from '@apollo/react-hooks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

const client = new ApolloClient({
    uri: 'localhost:4000',
});

ReactDOM.render(
    <Provider store={store}>
    <ApolloProvider client={client}>
        <App />
        </ApolloProvider>
        </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
