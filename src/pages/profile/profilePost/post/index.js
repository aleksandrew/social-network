// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { memo, useCallback } from 'react';

// local dependencies
import styles from './post.module.scss';
import Avatar from '../../../../components/avatar';

const Post = memo((props) => {
    const cx = classNames.bind(styles);
    const { id, date, like, fullName, photos, post, removePost, setLike, youselfLike } = props;

    let likeStatus;

    const onRemovePost = useCallback(() => removePost(id), [id, removePost]);
    const onLike = useCallback(() => setLike(id), [id, setLike]);

    if (like && youselfLike) {
        likeStatus = <p className={styles.FieldPostDescLike}> You and {like} other </p>;
    } else if (!like && youselfLike) {
        likeStatus = <p className={styles.FieldPostDescLike}> You</p>;
    } else if (like && !youselfLike) {
        likeStatus = <p className={styles.FieldPostDescLike}> {like} </p>;
    }

    return (
        <>
            <div className={cx(styles.Block, styles.FieldPost)}>
                <div className={styles.FieldPostKeyboard}>
                    <div className={styles.FieldPostLeft}>
                        <div className={styles.FieldPostAvaBorder}>
                            <Avatar width="38" height="38" src={photos} borderRadius={true}/>
                        </div>
                        <div className={styles.FieldPostData}>
                            <h4 className={styles.FieldPostNameAuthor}>
                                {fullName}
                            </h4>
                            <span className={styles.FieldPostDateCreated}>
                                {date.date} {date.time}
                            </span>
                        </div>
                    </div>
                    <button title="Remove post"
                        onClick={onRemovePost}
                        className={styles.FieldPostRemove}>
                        ×
                    </button>
                </div>
                <p className={cx(styles.FieldPostDesc, { FieldPostDescUnderline: likeStatus })}>
                    {post}
                </p>
                {likeStatus}
                <div className={styles.FieldPostInfo}>
                    <button title="Like"
                        onClick={onLike}
                        className={cx(styles.FieldPostInfoLike, {
                            FieldPostInfoLikeTrue: youselfLike,
                            FieldPostInfoLikeFalse: !youselfLike,
                        })}>
                        <div className={cx(styles.FieldPostInfoHandLike, {
                            FieldPostInfoHandLikeTrue: youselfLike,
                            FieldPostInfoHandLikeFalse: !youselfLike,
                        })}/>
                        Like
                    </button>
                </div>
            </div>
        </>
    );
});

Post.propTypes = {
    photos: PropTypes.string,
    id: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    post: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    setLike: PropTypes.func.isRequired,
    fullName: PropTypes.string.isRequired,
    removePost: PropTypes.func.isRequired,
    youselfLike: PropTypes.bool.isRequired,
};

Post.defaultProps = {
    photos: '',
};

export default Post;
