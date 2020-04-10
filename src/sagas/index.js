// outsource dependencies
import { fork } from 'redux-saga/effects';

// local dependencies
import app from './app';
import auth from './auth';
import users from './users';
import profile from './profile';
import message from './messages';


function * sagasRoot () {
    yield fork(app);
    yield fork(auth);
    yield fork(users);
    yield fork(profile);
    yield fork(message);
}

export default sagasRoot;
