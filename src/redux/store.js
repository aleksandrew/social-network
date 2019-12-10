import profileReducer from "./profile-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import usersReducer from "./user-reduce";

const reducers = combineReducers({
  profilePage: profileReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
