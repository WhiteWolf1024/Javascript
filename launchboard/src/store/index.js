import { createStore } from 'redux';
import rootreducer from './ducks/rootReducer';

const store = createStore(rootreducer);

export default store;