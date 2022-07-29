import {applyMiddleware, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';


import mainReducer from '../reducer/reducer';

const mainStore = createStore(
    mainReducer,
    composeWithDevTools(applyMiddleware(thunk)));

export default mainStore;