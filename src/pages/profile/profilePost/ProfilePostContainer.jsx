import React from 'react';
import {addPost, setLike, removePost} from "../../../redux/profile-reducer";
import ProfilePost from "./ProfilePost";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    profile: state.profilePage.profile,
    postData: state.profilePage.postData,
    isFetching: state.profilePage.isFetching
  }
};

export default connect(mapStateToProps, {addPost, removePost, setLike})(ProfilePost);
