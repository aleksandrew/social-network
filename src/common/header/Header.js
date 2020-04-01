// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { useState, useCallback } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

// local dependencies
import '../../style/_base.scss';
import styles from './header.module.scss';
import Avatar from '../../components/avatar';


const Header = React.memo((props) => {
    const cx = classNames.bind(styles);
    const { logout, photos, isAuth } = props;
    const [collapsed, setCollapsed] = useState(true);
    const [customAlert, setCustomAlert] = useState(true);

    const toggleNavbar = useCallback(() => setCollapsed(!collapsed), [collapsed]);
    const isLogout = useCallback(() => {
        logout();
        setCollapsed(true);
    }, [logout, setCollapsed]);

    return (
        <header className={styles.headerContainer}>
            <Navbar className={cx(styles.header)}>
                {
                    !isAuth && customAlert
                    && <div className={cx(styles.headerAlert, { [styles.headerAlertCollapsed]: !collapsed })}>
                        you were not log in.
                        <NavLink className="d-inline pl-2" href="/login">log in?</NavLink>
                        <span className="cursor-pointer" onClick={() => setCustomAlert(false)}>[x]</span>
                    </div>
                }

                <NavbarBrand className={styles.logo} href="/profile">
                    <div className={styles.logoWrapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path className={styles.logoIcon}
                                d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                        </svg>
                    </div>
                </NavbarBrand>
                <Nav className={styles.nav}>
                    <div className={styles.search}>
                        <input className={styles.searchField}/>
                        <button className={styles.searchButton}/>
                    </div>
                    <div className={styles.list}>
                        <NavItem className={styles.item}>
                            <NavLink className={cx('d-sm-flex d-none', styles.link, styles.linkProfile)}
                                href="/profile">
                                <Avatar width="24" height="24"
                                    borderRadius={true}
                                    src={photos && photos.small}
                                />
                                <span className={styles.linkProfileText}>
                  Profile
                                </span>
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.item}>
                            <NavLink className={cx('d-sm-flex d-none', styles.link, styles.linkProfile)}
                                href="/message">
                                Message
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.item}>
                            <NavLink className={cx('d-md-flex d-none', styles.link, styles.linkProfile)} href="/users">
                                Find Friends
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.item}>
                            <NavLink className={cx('d-lg-flex d-none', styles.link, styles.linkProfile)}
                                href="/setting">
                                Settings
                            </NavLink>
                        </NavItem>
                        <NavItem className={styles.item}>
                            <NavLink className={cx('d-xl-flex d-none', styles.link, styles.linkProfile)}
                                onClick={logout}>
                                Log Out
                            </NavLink>
                        </NavItem>
                        <NavbarToggler className={cx('d-xl-none d-flex')} onClick={toggleNavbar}>
                            <svg className={cx(styles.menu, { [styles.menuActive]: !collapsed })} width="24" height="24"
                                viewBox="0 0 24 24">
                                <path d="M24 6h-24v-4h24v4zm0 4h-24v4h24v-4zm0 8h-24v4h24v-4z"/>
                            </svg>
                        </NavbarToggler>
                    </div>
                </Nav>

                <Collapse isOpen={!collapsed} className={styles.hiddenMenu} navbar>
                    <Nav navbar>
                        <NavItem>
                            <NavLink className={cx('d-sm-none d-flex', styles.link, styles.linkHiddenMenu)}
                                href="/profile">
                                <Avatar width="26" height="26"
                                    borderRadius={true}
                                    src={photos && photos.small}
                                />
                                <span className={styles.linkProfileText}>
                                Profile
                                </span>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={cx('d-sm-none d-flex', styles.link, styles.linkHiddenMenu)}
                                href="/message">
                                Message
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={cx('d-md-none d-flex', styles.link, styles.linkHiddenMenu)}
                                href="/users">
                                Find Friends
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink className={cx('d-lg-none d-flex', styles.link, styles.linkHiddenMenu)}
                                href="/setting">
                                Settings
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={cx('d-xl-none d-flex cursor-pointer', styles.link, styles.linkHiddenMenu, styles.linkHiddenMenuLast)}
                                onClick={isLogout}>
                                Log Out
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>

            </Navbar>
        </header>
    );
});

Header.propTypes = {
    photos: PropTypes.object,
    logout: PropTypes.func.isRequired,
    isAuth: PropTypes.bool.isRequired,
};

Header.defaultProps = {
    photos: {},
};

export default Header;
