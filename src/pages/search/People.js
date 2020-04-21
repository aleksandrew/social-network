// outsource dependencies
import _ from 'lodash';
import classNames from 'classnames/bind';
import React, { memo, useCallback } from 'react';

// local dependencies
import styles from './search.module.scss';
import { NavLink } from 'react-router-dom';
import { USERS } from '../../constans/types';
import Avatar from '../../components/avatar/index';
import { useDispatch, useSelector } from 'react-redux';
import { selector } from '../../redusers/users-reducer';


const All = memo(() => {
    const cx = classNames.bind(styles);

    const dispatch = useDispatch();
    const follow = useCallback((userId) => dispatch({ type: USERS.FOLLOW, userId }), [dispatch]);
    const unfollow = useCallback((userId) => dispatch({ type: USERS.UNFOLLOW, userId }), [dispatch]);

    // state
    const { followingInProgress, findingUsers } = useSelector((state) => selector(state));

    return (
        <ul className={styles.PossibleAcquaintances}>
            {!!findingUsers && (
                _.map(findingUsers, (user) => (
                    <li key={user.id} className={cx('block', styles.item, styles.itemBlock)}>
                        <div className={styles.info}>
                            <div className={styles.photos}>
                                <Avatar width="75" height="75"
                                    borderRadius={true}
                                    src={user.photos.small}
                                />
                            </div>
                            <div className={styles.title}>
                                <NavLink to={`/profile/${user.id}`}
                                    className={styles.username}
                                >
                                    {user.name}
                                </NavLink>
                                <div className={styles.status}>
                                    {user.status}
                                </div>
                            </div>
                        </div>
                        <div className={styles.keyboard}>
                            {user.followed
                                ? <button onClick={() => unfollow(user.id)}
                                    className={cx('btn', styles.button, styles.unfollow)}
                                    disabled={_.some(followingInProgress, (id) => id === user.id)}
                                >
                                    Unfreind
                                </button>
                                : <button onClick={() => follow(user.id)}
                                    className={cx('btn', styles.button, styles.follow)}
                                    disabled={_.some(followingInProgress, (id) => id === user.id)}
                                >
                                    Add Friend
                                </button>
                            }
                        </div>
                    </li>
                ))
            )}
            {!findingUsers && (
                <p className="text-center display-4"> Please use the search string</p>
            )}
        </ul>
    );
});

export default All;