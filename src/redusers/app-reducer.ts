// outsource dependencies

// local dependencies
import { APP } from '../constans/types';


type initialStateType = {
    initialized: boolean,
    errorMessages: null | string,
};

const initialState: initialStateType = {
    initialized: false,
    errorMessages: null,
};

export const selector = (state: any) => state.app;

const appReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case APP.INITIALIZED_SUCCESS:

            return {
                ...state,
                initialized: true,
            };

        case APP.SET_ERROR_MESSAGES: {
            const { messages } = action;

            return {
                ...state,
                errorMessages: messages,
            };
        }

        default:
            return state;
    }
};

export default appReducer;
