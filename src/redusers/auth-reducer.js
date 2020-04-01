// outsource dependencies

// local dependencies
import { AUTH } from '../constans/types';


const initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    test: { email: 'free@samuraijs.com', password: 'free', name: 'John Doe' },
};

export const selector = (state) => state.auth;

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH.SET_USER_DATA:

            return {
                ...state,
                ...action.payload,
                userId: action.payload.id,
            };
        case AUTH.SET_LOGOUT:

            return {
                ...state,
                userId: null,
                email: null,
                login: null,
                isAuth: false,
            };

        default:
            return state;
    }
};

export default authReducer;
