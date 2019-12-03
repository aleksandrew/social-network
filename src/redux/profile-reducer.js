import {profileAPI} from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

const initialState = {
  postData: [
    {id: 1, like: 23, post: 'Lorem ipsum dolor sit amet.'},
    {id: 2, like: 35, post: 'Lorem ipsum dolor sit.'},
    {id: 3, like: 60, post: 'Lorem ipsum dolor.'},
    {id: 4, like: 1, post: 'Lorem ipsum.'},
    {id: 5, like: 5, post: 'Lorem.'}
  ],
  profile: null,
  status: "",
};

const profileReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_POST:
      const newPost = {
        id: state.postData.length + 1,
        post: action.newPostBody,
        like: 0
      };

      return {
        ...state,
        newPostText: '',
        postData: [...state.postData, newPost]
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

    default:
      return state;
  }
};

// action creater
export const addPostActionCreator = newPostBody => ({type: ADD_POST, newPostBody});
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
