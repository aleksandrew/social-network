import React, {useState} from 'react';
import style from './Post.module.scss';
import Ava from "../../../../components/ava/Ava";

const Post = props => {

  const {id, date, like, fullName, post, removePost, setLike, youselfLike} = props;

  // const [localLike, setLocalLike] = useState(youselfLike);

  let likeStatus = null;

  const onRemovePost = () => {
    removePost(id)
  };

  const onLike = () => {
    setLike(id)
  };

  if ( like && youselfLike ) {
    likeStatus =  <p className={style.FieldPostDescLike}> You and {like} other </p>
  }
  else if ( !like && youselfLike ) {
    likeStatus =  <p className={style.FieldPostDescLike}> You</p>
  }
  else if ( like && !youselfLike ) {
    likeStatus =  <p className={style.FieldPostDescLike}> {like}</p>
  }

  return <>
    <div className={`${style.Block} ${style.FieldPost}`}>
      <div className={`${style.FieldPostKeyboard}`}>
        <div className={style.FieldPostLeft}>
          <div className={style.FieldPostAvaBorder}>
            <Ava width={"38"} height={"38"}/>
          </div>
          <div className={style.FieldPostData}>
            <h4 className={style.FieldPostNameAuthor}>{fullName}</h4>
            <span className={style.FieldPostDateCreated}>
                {date.date} {date.time}
                </span>
          </div>
        </div>
        <button onClick={onRemovePost}
                className={`${style.FieldPostRemove}`}
                title={"Remove post"}>×</button>
      </div>
      <p className={`${style.FieldPostDesc} ${likeStatus && style.FieldPostDescUnderline}`}>
        {post}
      </p>
      {likeStatus}
      <div className={style.FieldPostInfo}>
        <button onClick={onLike} className={`${style.FieldPostInfoLike} ${youselfLike ? style.FieldPostInfoLikeTrue : style.FieldPostInfoLikeFalse}`} title={"Like"}>
          <div className={`${style.FieldPostInfoHandLike} ${youselfLike ? style.FieldPostInfoHandLikeTrue : style.FieldPostInfoHandLikeFalse}`}/>
          Like
        </button>
      </div>
    </div>
  </>
};

export default Post;
