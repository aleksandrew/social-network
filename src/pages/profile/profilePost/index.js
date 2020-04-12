// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// local dependencies
import Post from './post';
import style from './profilePost.module.scss';
import ProfilePostForm from './ProfilePostForm';
import { PROFILE } from '../../../constans/types';
import { selector } from '../../../redusers/profile-reducer';

const ProfilePost = memo(() => {
    // state
    const { postData, profile } = useSelector((state) => selector(state));

    // dispatch
    const dispatch = useDispatch();
    const setLike = useCallback((idPost) => dispatch({ type: PROFILE.SET_LIKE, idPost }), [dispatch]);
    const removePost = useCallback((idPost) => dispatch({ type: PROFILE.REMOVE_POST, idPost }), [dispatch]);
    const addPost = useCallback((newPostBody) => dispatch({ type: PROFILE.ADD_POST, newPostBody }), [dispatch]);


    const addNewPost = useCallback((post) => {
        post.newPostBody && addPost(post.newPostBody);
        post.newPostBody = '';
    }, [addPost]);

    return (
        <section className={style.Posts}>
            <ProfilePostForm onSubmit={addNewPost}
                photos={profile.photos.small}
            />
            <div>
                <h3 className={style.Posts}>Posts</h3>
                {
                    _.map(postData, (post) => (
                        <Post key={post.id} id={post.id}
                            date={post.date} removePost={removePost} setLike={setLike}
                            photos={profile.photos.small} youselfLike={post.youselfLike}
                            post={post.post} like={post.like} fullName={profile.fullName}
                        />
                    ))
                }
            </div>
        </section>
    );
});

export default ProfilePost;
