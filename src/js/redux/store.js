import { createStore } from 'redux';
import rootReducer from './reducer/root';
import middleware from './middleware';

const store = createStore(rootReducer, middleware);


export default store;
