import {authAPI} from "../api/api";
import {getAuthUserData} from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {

  switch (action.type) {

    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };

    default:
      return state;
  }
};

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCCESS
});

// when all the calls that are necessary for initialization come, then we will install initializedSuccess() on initialized: false
export const initializeApp = () => dispatch => {
  // for asynchrony
  // to do this, create variables and put the dispatch necessary for us inside (it is important that thunk return the result of their work)
  const promise = dispatch(getAuthUserData());

  // using Promise.all, we put an array of the necessary variables
  Promise.all([promise])
    .then(() => {
      dispatch(initializedSuccess());
    })
};

export default appReducer;
