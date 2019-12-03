import profileReducer from "./profile-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'

const reducers = combineReducers({
  profilePage: profileReducer,
  form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
