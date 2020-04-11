// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import React, { memo, useCallback } from 'react';

// local dependencies
import '../../style/_base.scss';
import styles from './header.module.scss';
import Input from '../../components/input';


const Search = memo((props) => {
    const cx = classNames.bind(styles);
    const {
        handleSubmit, pristine, searchUsers, searchString,
        findingUsers, closeWindow, searchWindow, closeSearchWindow,
    } = props;

    const isFind = useCallback((data) => {
        searchUsers(data.term);
    }, [searchUsers]);

    return (
        <>
            <form className={styles.search} onSubmit={handleSubmit(isFind)}>
                <Field name="term"
                    type="input"
                    component={Input}
                    placeholder="Search"
                    classNameInput={cx(styles.searchInput)}
                    classNameContainer={cx(styles.searchContainer)}
                />
                <button type="submit" disabled={pristine} className={styles.searchButton}/>
                {searchWindow && (
                    <div className={styles.findingContainer}>
                        <div className={styles.findingContainerClose} onClick={closeSearchWindow}>x</div>
                        {_.map(_.slice(findingUsers, 0, 10), (user) => (
                            <NavLink key={user.id}
                                to={`/profile/${user.id}`}
                                onClick={closeSearchWindow}
                                className={styles.findingUsers}
                            >
                                {user.name}
                            </NavLink>
                        ))}
                        <NavLink to={'/search'}
                            className={styles.findingUsers}
                            onClick={() => closeWindow()}
                        >
                            See all results for {searchString}
                        </NavLink>
                    </div>
                )}
            </form>
        </>
    );
});

Search.propTypes = {
    searchString: PropTypes.string,
    findingUsers: PropTypes.array,
    pristine: PropTypes.bool.isRequired,
    searchUsers: PropTypes.func.isRequired,
    closeWindow: PropTypes.func.isRequired,
    searchWindow: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    closeSearchWindow: PropTypes.func.isRequired,
};

Search.defaultProps = {
    searchString: '',
    findingUsers: null,
};

export default reduxForm({
    form: 'search',
})(Search);
