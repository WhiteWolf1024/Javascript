
import { combineReducers } from 'redux';
import wallet from './wallet';
import display from './display'

export default combineReducers({ wallet, display });