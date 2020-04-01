// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { reducer as formReducer } from 'redux-form';
import { applyMiddleware, combineReducers, createStore } from 'redux';

// local dependencies
import sagasRoot from '../sagas';
import appReducer from './app-reducer';
import authReducer from './auth-reducer';
import usersReducer from './users-reducer';
import profileReducer from './profile-reducer';
import messageReducer from './message-reducer';


const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    form: formReducer,
    users: usersReducer,
    profile: profileReducer,
    message: messageReducer,
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagasRoot);

window.store = store;

export default store;
