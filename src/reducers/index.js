import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
})