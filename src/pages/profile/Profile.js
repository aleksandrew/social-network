// outsource dependencies
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import classNames from 'classnames/bind';

// local dependencies
import ProfilePost from './profilePost';
import ProfileIntro from './profileIntro';
import styles from './profile.module.scss';
import ProfileHeader from './profileHeader';

const Profile = memo((props) => {
    const cx = classNames.bind(styles);
    const { profile } = props;

    return (
        <main className={cx('container', styles.Main)}>
            <ProfileHeader {...props} />
            <div className={styles.Bottom}>
                <ProfileIntro {...profile} />
                <ProfilePost />
            </div>
        </main>
    );
});

Profile.propTypes = {
    status: PropTypes.string,
    profile: PropTypes.object,
    updateStatus: PropTypes.func.isRequired,
};

Profile.defaultProps = {
    status: '',
    profile: {},
};

export default Profile;
