// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';

// local dependencies
import '../../style/_base.scss';
import styles from './Users.module.scss';
import Avatar from '../../components/avatar';
import Pagination from '../../components/pagination';


const Users = memo((props) => {
    const cx = classNames.bind(styles);
    const {
        unfollow, follow, followingInProgress, onPageChanged,
        users, userRemove, currentPage, totalUsersCount, pageSize,
    } = props;

    return <main className={cx('container', styles.Users)}>
        <section className={cx('block', styles.PossibleAcquaintances)}>
            <div className={styles.Header}>
                <h2 className={styles.HeaderTitle}>
                    People You May Know
                </h2>
            </div>
            <ul className={styles.List}>
                {
                    _.map(users, (user) => (
                        <li key={user.id} className={styles.Item}>
                            <div className={styles.Info}>
                                <div className={styles.Photos}>
                                    <Avatar width="75" height="75" src={user.photos.small}/>
                                </div>
                                <div className={styles.Title}>
                                    <NavLink to={`/profile/${user.id}`}
                                        className={styles.Username}
                                    >
                                        {user.name}
                                    </NavLink>
                                    <div className={styles.Status}>
                                        {user.status}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.Keyboard}>
                                {user.followed
                                    ? <button onClick={() => unfollow(user.id)}
                                        className={cx('btn', styles.Button, styles.Unfollow)}
                                        disabled={_.some(followingInProgress, (id) => id === user.id)}
                                    >
                                        Remove Friend
                                    </button>
                                    : <button onClick={() => follow(user.id)}
                                        className={cx('btn', styles.Button, styles.Follow)}
                                        disabled={_.some(followingInProgress, (id) => id === user.id)}
                                    >
                                        Add Friend
                                    </button>
                                }
                                <button onClick={() => userRemove(user.id)}
                                    className={cx('btn', styles.Remove)}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <Pagination pageSize={pageSize}
                currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalUsersCount={totalUsersCount}
            />
        </section>
    </main>;
});

Users.propTypes = {
    follow: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    unfollow: PropTypes.func.isRequired,
    userRemove: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalUsersCount: PropTypes.number.isRequired,
    followingInProgress: PropTypes.array.isRequired,
};

export default Users;
