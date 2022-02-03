import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import Reducer from './_reducers';

// redux-promise, redux-thunk 사용을 위한 미들웨어 만들기
// 그냥 store는 객체받게 못 받기 때문에, function과 Promise 받을 수 있도록 함
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk) (createStore)


ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(Reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&    // Chrome의 redux devtool 가져오기
      window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <App />
    </Provider>
    
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
