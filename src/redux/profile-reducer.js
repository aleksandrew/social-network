import {profileAPI} from "../api/api";
import {data} from "../utils/time";

const ADD_POST = 'ADD_POST';
const REMOVE_POST = 'REMOVE_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_LIKE = 'SET_LIKE';

const initialState = {
  postData: [
    {id: 5, like: 0, youselfLike: false, post: 'Lorem ipsum dolor sit amet.', date: {date: '15.10.2019', time: '17:15'}},
    {id: 4, like: 1, youselfLike: false, post: 'Lorem ipsum dolor sit.', date: {date: '15.10.2019', time: '17:15'}},
    {id: 3, like: 60, youselfLike: false, post: 'Lorem ipsum dolor.', date: {date: '15.10.2019', time: '17:15'}},
    {id: 2, like: 0, youselfLike: true, post: 'Lorem ipsum.', date: {date: '15.10.2019', time: '17:15'}},
    {id: 1, like: 23, youselfLike: true, post: 'Lorem.', date: {date: '15.10.2019', time: '17:15'}}
  ],
  isFetching: false,
  profile: null,
  status: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:

      const newPost = {
        id: state.postData.length + 1,
        like: 0,
        youselfLike: false,
        post: action.newPostBody,
        date: {date: data.getDate(), time: data.getTime()}
      };

      return {
        ...state,
        postText: '',
        postData: [newPost, ...state.postData]
      };

    case REMOVE_POST:

      return {
        ...state,
        postData: state.postData.filter(post => post.id !== action.idPost)
      };

    case UPDATE_NEW_POST_TEXT:

      return {
        ...state,
        newPostText: action.text
      };

    case SET_STATUS:

      return {
        ...state,
        status: action.status
      };

    case SET_USER_PROFILE:

      return {
        ...state,
        profile: action.profile
      };

    case SET_LIKE:

      return {
        ...state,
        postData: state.postData.map(post => {
          if (post.youselfLike && post.id === action.idPost) {
            return {...post, youselfLike: false }
          } else if (!post.youselfLike && post.id === action.idPost) {
            return {...post, youselfLike: true }
          }

          return {...post}
        })

      };

    default:
      return state;
  }
};

// action creater
export const addPost = newPostBody => ({type: ADD_POST, newPostBody});
export const removePost = idPost => ({type: REMOVE_POST, idPost});
export const setLike = idPost => ({type: SET_LIKE, idPost});
export const setUserProfile = profile => ({type: SET_USER_PROFILE, profile});
export const setStatus = status => ({type: SET_STATUS, status});


// thunk
export const reviewUser = userId => async (dispatch) => {

  const response = await profileAPI.viewProfile(userId);

  dispatch(setUserProfile(response.data));
};

export const getStatus = userId => async (dispatch) => {

  const response = await profileAPI.getStatus(userId);

  dispatch(setStatus(response.data));
};

export const updateStatus = status => async (dispatch) => {

  const response = await profileAPI.upadateStatus(status);

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
