// outsource dependencies
import _ from 'lodash';

// local dependencies
import { USERS } from '../constans/types';

const initialState = {
    users: [],
    findingUsers: null,
    searchString: '',
    searchWindow: false,
    pageSize: 10,
    allUsers: [],
    currentPage: 1,
    isFetching: true,
    followedUsers: [],
    totalUsersCount: 0,
    followingInProgress: [],
};

export const selector = (state) => state.users;

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERS.FOLLOW_SUCCESS: {
            const { userId } = action;

            return {
                ...state,
                users: _.map(state.users, (user) => {
                    if (user.id === userId) {
                        return { ...user, followed: true };
                    }

                    return user;
                }),
                findingUsers: _.map(state.findingUsers, (user) => {
                    if (user.id === userId) {
                        return { ...user, followed: true };
                    }

                    return user;
                }),
            };
        }

        case USERS.UNFOLLOW_SUCCESS: {
            const { userId } = action;

            return {
                ...state,
                users: _.map(state.users, (user) => {
                    if (user.id === userId) {
                        return { ...user, followed: false };
                    }

                    return user;
                }),
                findingUsers: _.map(state.findingUsers, (user) => {
                    if (user.id === userId) {
                        return { ...user, followed: false };
                    }

                    return user;
                }),
            };
        }

        case USERS.ALL_USERS: {
            const { users } = action;

            return {
                ...state,
                allUsers: [state.allUsers, ...users],
            };
        }

        case USERS.SET_USERS: {
            const { users } = action;

            return {
                ...state,
                users: users,
            };
        }

        case USERS.SET_SEARCH_USERS: {
            const { users, term } = action.payload;

            return {
                ...state,
                searchString: term,
                findingUsers: users,
                searchWindow: true,
            };
        }

        case USERS.CLEAN_SEARCH_USERS: {
            return {
                ...state,
                searchString: null,
                findingUsers: null,
                searchWindow: false,
            };
        }

        case USERS.CLOSE_SEARCH_WINDOW: {
            return {
                ...state,
                searchWindow: false,
            };
        }

        case USERS.UPDATE_SEARCH_USERS: {
            const { users } = action;

            return {
                ...state,
                findingUsers: users,
            };
        }

        case USERS.SET_FOLLOWED_USERS: {
            const { users } = action;
            const setFollowedUsers = _.filter(users, (user) => user.followed);

            return {
                ...state,
                followedUsers: [...state.followedUsers, ...setFollowedUsers],
            };
        }

        case USERS.USER_REMOVE: {
            const { userId } = action;

            return {
                ...state,
                users: _.filter(state.users, (user) => user.id !== userId),
            };
        }

        case USERS.SET_CURRENT_PAGE: {
            const { currentPage } = action;

            return {
                ...state,
                currentPage: currentPage,
            };
        }

        case USERS.SET_TOTAL_USERS_COUNT: {
            const { count } = action;

            return {
                ...state,
                totalUsersCount: count,
            };
        }

        case USERS.TOGGLE_IS_FETCHING: {
            const { isFetching } = action;

            return {
                ...state,
                isFetching: isFetching,
            };
        }

        case USERS.TOGGLE_FOLLOWING_PROGRESS: {
            const { isFetching, userId } = action.payload;

            return {
                ...state,
                followingInProgress: isFetching
                    ? [...state.followingInProgress, userId]
                    : _.filter(state.followingInProgress, (id) => id !== userId),
            };
        }

        default:
            return state;
    }
};

export default usersReducer;
