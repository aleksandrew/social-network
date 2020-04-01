// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { memo } from 'react';

// local dependencies
import user from '../../images/icon/user.svg';
import styles from './avatar.module.scss';


const Avatar = memo((props) => {
    const cx = classNames.bind(styles);
    const { width, height, src, borderRadius, style, ...attr } = props;

    return (
        <div style={{ width: `${width}px`, height: `${height}px` }}
            className={cx(styles.img, { imgBorderRadius: borderRadius })}
            {...attr}>
            <img style={{ ...style }} alt="User" src={src || user}/>
        </div>
    );
});

Avatar.propTypes = {
    src: PropTypes.string,
    attr: PropTypes.object,
    style: PropTypes.object,
    borderRadius: PropTypes.bool,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
};

Avatar.defaultProps = {
    src: '',
    attr: {},
    style: {},
    borderRadius: false,
};

export default Avatar;
