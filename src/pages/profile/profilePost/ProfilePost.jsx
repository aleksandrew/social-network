import React from 'react';
import style from './ProfilePost.module.scss';
import Post from "./post/Post";
import ProfilePostFormRedux from "./ProfilePostForm";

const ProfilePost = React.memo(props => {

  const {postData, addPost, profile, removePost, setLike} = props;

  const posts = postData.map((post, i) => {
    return <Post key={i} id={post.id} date={post.date} removePost={removePost}
                 setLike={setLike} post={post.post} like={post.like}
                 fullName={profile.fullName} youselfLike={post.youselfLike} />
  });

  const addNewPost = post => {
    addPost(post.newPostBody)
  };

  return <section className={`${style.Posts}`}>
    <ProfilePostFormRedux onSubmit={addNewPost}/>
    <div>
      <h3 className={`${style.Posts}`}>Posts</h3>
      {posts}
    </div>
  </section>
});

export default ProfilePost;
