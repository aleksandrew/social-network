// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import React, { memo, useCallback, useEffect } from 'react';

// local dependencies
import Footer from '../footer';
import '../../style/_base.scss';
import styles from './error.module.scss';
import thumb from '../../images/content/thumb_broken.png';


const Error = memo((props) => {
    const { history } = props;
    const cx = classNames.bind(styles);

    useEffect(() => {
        document.title = 'Page Not Found';
    });
    const prevPage = useCallback(() => history.goBack(), [history]);

    return (
        <section className={cx('wrapper', styles.error)}>
            <div className={cx('content', styles.errorContainer)}>
                <h1 className={cx('mb-5')}>
                    This page isn&#39;t available
                </h1>
                <p className={cx('mb-5', styles.errorDesc)}><strong>
                    The link you followed may be broken, or the page may have been removed.
                </strong></p>
                <img className={cx('mb-5', styles.errorImage)} src={thumb} alt="error page"/>
                <Nav>
                    <NavItem className={cx(styles.errorItem)}>
                        <p onClick={prevPage}>
                            Go back to the previous page
                        </p>
                    </NavItem>
                    <NavItem className={cx(styles.errorItem)}>
                        <NavLink to="/profile">
                            Go to profile
                        </NavLink>
                    </NavItem>
                    <NavItem className={cx(styles.errorItem)}>
                        <a rel="noopener noreferrer" target="_blank" href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=andrew.alexandrow97@gmail.com&su=socialNetwork&tf=1">
                            Visit our Help Center
                        </a>
                    </NavItem>
                </Nav>
            </div>
            <Footer />
        </section>
    );
});

Error.propTypes = {
    history: PropTypes.object.isRequired,
};

export default Error;
