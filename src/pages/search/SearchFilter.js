// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Field, reduxForm } from 'redux-form';
import React, { memo, useCallback } from 'react';

// local dependencies
import styles from './search.module.scss';
import { PROFILE, USERS } from '../../constans/types';
import { Checkbox } from '../../components/checkbox/index';
import { selector as usersSelector } from '../../redusers/users-reducer';


const SearchFilter = memo((props) => {
    const cx = classNames.bind(styles);
    const { handleSubmit, searchUsers, searchString, findingUsers, updateSearchUsers } = props;

    const onSubmit = useCallback(() => {
        searchUsers(searchString);
    }, [searchUsers, searchString]);

    const onSearch = useCallback((data) => {
        const { followers } = data;

        if (findingUsers) {
            if (!followers) {
                const users = _.filter(findingUsers, (user) => user.followed);
                updateSearchUsers(users);
            } else {
                searchUsers(searchString);
            }
        }
    }, [searchUsers, findingUsers, updateSearchUsers, searchString]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <h2 className={styles.filterTitle}>Filter Results</h2>
            <div className={styles.type}>
                <h4 className={styles.typeTitle}>Followers</h4>
                <Field name="followers"
                    label="Followers"
                    component={Checkbox}
                    onChange={handleSubmit(onSearch)}
                />
            </div>
            {searchString && (
                <div className={styles.type}>
                    <button className={cx('btn', styles.typeBtn)}>
                        Reset
                    </button>
                </div>
            )}
        </form>
    );
});

SearchFilter.propTypes = {
    findingUsers: PropTypes.array,
    searchString: PropTypes.string,
    searchUsers: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateSearchUsers: PropTypes.func.isRequired,
};

SearchFilter.defaultProps = {
    searchString: '',
    findingUsers: null,
};

export default connect(
    // mapStateToProps
    (state) => ({
        searchString: usersSelector(state).searchString,
        findingUsers: usersSelector(state).findingUsers,
    }),
    // mapDispatchToProps
    (dispatch) => ({
        searchUsers: (term) => dispatch({ type: USERS.SEARCH_USERS, term }),
        updateSearchUsers: (users) => dispatch({ type: USERS.UPDATE_SEARCH_USERS, users }),
        updateData: (data, userId) => dispatch({ type: PROFILE.UPDATE_DATA, data, userId }),
    }),
)(reduxForm({
    form: 'searchForm',
})(SearchFilter));
