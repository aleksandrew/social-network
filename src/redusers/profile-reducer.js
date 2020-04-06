// outsource dependencies
import _ from 'lodash';

// local dependencies
import { PROFILE } from '../constans/types';
import { currentDate } from '../components/time';

const initialState = {
    postData: [
        {
            id: 5,
            like: 0,
            youselfLike: false,
            post: 'Lorem ipsum dolor sit amet.',
            date: { date: currentDate.getDate(1), time: '17:15' },
        },
        {
            id: 4,
            like: 1,
            youselfLike: false,
            post: 'Lorem ipsum dolor sit.',
            date: { date: currentDate.getDate(13), time: '17:15' },
        },
        {
            id: 3,
            like: 60,
            youselfLike: false,
            post: 'Lorem ipsum dolor.',
            date: { date: currentDate.getDate(18), time: '19:70' },
        },
        { id: 2, like: 0, youselfLike: true, post: 'Lorem ipsum.', date: { date: currentDate.getDate(31), time: '17:15' } },
        { id: 1, like: 23, youselfLike: true, post: 'Lorem.', date: { date: currentDate.getDate(31), time: '17:15' } },
    ],
    profile: null,
    status: '',
};

export const selector = (state) => state.profile;

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROFILE.ADD_POST: {
            const newPost = {
                id: state.postData.length + 1,
                like: 0,
                youselfLike: false,
                post: action.newPostBody,
                date: { date: currentDate.getDate(), time: currentDate.getTime() },
            };

            return {
                ...state,
                postData: [newPost, ...state.postData],
            };
        }

        case PROFILE.REMOVE_POST:

            return {
                ...state,
                postData: _.filter(state.postData, (post) => post.id !== action.idPost),
            };

        case PROFILE.SET_STATUS:

            return {
                ...state,
                status: action.status,
            };

        case PROFILE.SET_USER_PROFILE: {
            const { profile, userId } = action.payload;

            if (userId === profile.userId) {
                localStorage.removeItem('primeryProfile');
                localStorage.setItem('primeryProfile', JSON.stringify([profile]));
            }

            return {
                ...state,
                profile,
            };
        }

        case PROFILE.SET_PHOTO_SUCCESS:

            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: action.photos,
                },
            };

        case PROFILE.SET_LIKE:

            return {
                ...state,
                postData: _.map(state.postData, (post) => {
                    if (post.youselfLike && post.id === action.idPost) {
                        return { ...post, youselfLike: false };
                    } else if (!post.youselfLike && post.id === action.idPost) {
                        return { ...post, youselfLike: true };
                    }

                    return { ...post };
                }),

            };

        default:
            return state;
    }
};

export default profileReducer;
