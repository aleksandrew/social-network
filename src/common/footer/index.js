// outsource dependencies
import React, { memo } from 'react';
import classNames from 'classnames/bind';

// local dependencies
import '../../style/_base.scss';
import styles from './footer.module.scss';


const Error = memo(() => {
    const cx = classNames.bind(styles);

    return (
        <footer className={cx('footer', styles.bottomBlock)}>
            <div className="container">
                <div className={styles.bottomDesc}>select language</div>
                <div className={styles.bottomDesc}>created for education purposes</div>
                <div className={styles.bottomDesc}>©alexandrew 2020</div>
            </div>
        </footer>
    );
});

export default Error;
