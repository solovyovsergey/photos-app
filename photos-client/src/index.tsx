import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducers';
import {
  watchLoadPhotosIdRequest,
  main, mainChannel, watchLoadTestRequest
} from './utils/sagas';
import App from './App';
import './index.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();
//const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(sagaMiddleware)));
export type a = ReturnType<typeof store.getState>;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
sagaMiddleware.run(watchLoadPhotosIdRequest)
sagaMiddleware.run(mainChannel);
sagaMiddleware.run(watchLoadTestRequest);
