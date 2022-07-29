import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CountriesApp from './countriesApp';
import reportWebVitals from './reportWebVitals';
// Nos importamos el provider para poder asignar el store
import {Provider} from  'react-redux'
import mainStore from './redux/store/store'

ReactDOM.render(
  <Provider store={mainStore}>
  <React.StrictMode>
    <CountriesApp />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
