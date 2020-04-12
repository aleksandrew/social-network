// outsource dependencies
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Nav, NavItem } from 'reactstrap';
import React, { memo, useCallback, useEffect } from 'react';
import { Redirect, Route, Switch, NavLink } from 'react-router-dom';

// local dependencies
import All from './All';
import People from './People';
import '../../style/_base.scss';
import styles from './search.module.scss';
import { useSelector } from 'react-redux';
import SearchFilter from './SearchFilter';
import { selector } from '../../redusers/users-reducer';


const Search = memo((props) => {
    const cx = classNames.bind(styles);
    const { location } = props;

    // state
    const { findingUsers, searchString } = useSelector((state) => selector(state));

    useEffect(() => {
        document.title = searchString;
    }, [findingUsers, searchString]);

    const isActive = useCallback((path) => {
        return location.pathname === path;
    }, [location]);

    return (
        <main className={styles.search}>
            <Nav className={styles.searchNav}>
                <NavItem className={cx(styles.searchList, {
                    searchActive: isActive('/search/all'),
                })}>
                    <NavLink to="/search/all"
                        className={cx(styles.searchLink)}
                    >
                        All
                    </NavLink>
                </NavItem>
                <NavItem className={cx(styles.searchList, {
                    searchActive: isActive('/search/people'),
                })}>
                    <NavLink to="/search/people"
                        className={cx(styles.searchLink)}
                    >
                        People
                    </NavLink>
                </NavItem>
            </Nav>
            <div className={cx('container', styles.searchContainer)}>
                <section className={styles.filter}>
                    <SearchFilter/>
                </section>
                <Switch>
                    <Route path="/search/all" component={All}/>
                    <Route path="/search/people" component={People}/>
                    <Redirect exact from="/search" to="/search/all"/>
                </Switch>

            </div>
        </main>
    );
});

Search.propTypes = {
    location: PropTypes.object.isRequired,
};

export default Search;
