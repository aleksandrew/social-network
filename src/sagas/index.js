// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import app from './app';
import auth from './auth';
import users from './users';
import profile from './profile';


function * sagasRoot () {
    yield fork(app);
    yield fork(auth);
    yield fork(users);
    yield fork(profile);
}

export default sagasRoot;
