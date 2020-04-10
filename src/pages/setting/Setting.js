// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Nav, NavItem } from 'reactstrap';
import React, { memo, useCallback } from 'react';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';

// local dependencies
import General from './General';
import Contacts from './Contacts';
import Footer from '../../common/footer';
import styles from './setting.module.scss';


const Setting = memo((props) => {
    const { location } = props;
    const cx = classNames.bind(styles);

    const isActive = useCallback((path) => {
        return location.pathname === path;
    }, [location]);

    return (
        <main className={cx('wrapper', styles.setting)}>
            <section className={cx('content container', styles.settingWrapper)}>
                <h1 className={cx('d-md-none d-flex', styles.title)}>Account Settings</h1>
                <Nav className={cx(styles.navbar)}>
                    <NavItem className={cx({
                        navbarActive: isActive('/setting/general'),
                    })}>
                        <NavLink to="/setting/general"
                            className={cx(styles.navbarLink)}
                        >
                            General
                        </NavLink>
                    </NavItem>
                    <NavItem className={cx({
                        navbarActive: isActive('/setting/contacts'),
                    })}>
                        <NavLink to="/setting/contacts"
                            className={cx(styles.navbarLink)}
                        >
                            Contacts
                        </NavLink>
                    </NavItem>
                </Nav>
                <div className={cx(styles.settingBlock)}>
                    <h1 className={cx('d-md-flex d-none', styles.title)}>Account Settings</h1>
                    <div className={cx(styles.form)}>
                        <Switch>
                            <Route path="/setting/general" component={General}/>
                            <Route path="/setting/contacts" component={Contacts}/>
                            <Redirect exact from="/setting" to="/setting/general"/>
                        </Switch>
                    </div>
                </div>
            </section>
            <Footer/>
        </main>
    );
});

Setting.propTypes = {
    location: PropTypes.object.isRequired,
};

export default Setting;