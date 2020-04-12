// outsource dependencies
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { Field, reduxForm } from 'redux-form';
import { Collapse, NavbarToggler } from 'reactstrap';
import React, { memo, useState, useCallback } from 'react';

// local dependencies
import styles from './search.module.scss';
import { PROFILE, USERS } from '../../constans/types';
import { Checkbox } from '../../components/checkbox/index';
import { selector as usersSelector } from '../../redusers/users-reducer';


const SearchFilter = memo((props) => {
    const cx = classNames.bind(styles);
    const { handleSubmit, searchUsers, searchString, findingUsers, updateSearchUsers } = props;

    const [menuCollapsed, setMenuCollapsed] = useState(true);

    const toggleNav = useCallback(() => setMenuCollapsed(!menuCollapsed), [menuCollapsed]);
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.filterTitle}>Filter Results</h2>
            <div className={styles.filterBlock}>
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
            </div>
            <NavbarToggler className={cx('d-xl-none d-flex')} onClick={toggleNav}>
                <svg className={cx(styles.menu, { [styles.menuActive]: !menuCollapsed })} width="24" height="24"
                    viewBox="0 0 58.67 64">
                    <title>
                        {
                            menuCollapsed
                                ? 'open filter'
                                : 'close filter'
                        }
                    </title>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <path
                                d="M10.67,11.89V2.67a2.67,2.67,0,0,0-5.34,0v9.22A9.82,9.82,0,0,1,8,11.55,9.82,9.82,0,0,1,10.67,11.89Z"/>
                            <path
                                d="M5.33,32.53v28.8a2.67,2.67,0,0,0,5.34,0V32.53A9.83,9.83,0,0,1,8,32.88,9.83,9.83,0,0,1,5.33,32.53Z"/>
                            <path
                                d="M32,37.68v-35a2.67,2.67,0,1,0-5.34,0v35a10.32,10.32,0,0,1,2.72-.38A9.42,9.42,0,0,1,32,37.68Z"/>
                            <path
                                d="M26.61,58.29v3a2.67,2.67,0,1,0,5.34,0v-3a9.42,9.42,0,0,1-2.62.35A10.32,10.32,0,0,1,26.61,58.29Z"/>
                            <path
                                d="M53.28,13.68v-11a2.67,2.67,0,1,0-5.33,0v11a10.27,10.27,0,0,1,2.72-.38A9.4,9.4,0,0,1,53.28,13.68Z"/>
                            <path
                                d="M48,34.29v27a2.67,2.67,0,1,0,5.33,0v-27a9.4,9.4,0,0,1-2.61.35A10.27,10.27,0,0,1,48,34.29Z"/>
                            <path
                                d="M8,14.22a8,8,0,1,0,8,8A8,8,0,0,0,8,14.22ZM8,24.89a2.67,2.67,0,1,1,2.67-2.67A2.68,2.68,0,0,1,8,24.89Z"/>
                            <path
                                d="M29.33,40a8,8,0,1,0,8,8A8,8,0,0,0,29.33,40Zm0,10.67A2.67,2.67,0,1,1,32,48,2.67,2.67,0,0,1,29.33,50.67Z"/>
                            <path
                                d="M50.67,16a8,8,0,1,0,8,8A8,8,0,0,0,50.67,16Zm0,10.67A2.67,2.67,0,1,1,53.33,24,2.68,2.68,0,0,1,50.67,26.67Z"/>
                        </g>
                    </g>
                </svg>
            </NavbarToggler>

            <Collapse isOpen={!menuCollapsed}
                className={cx(styles.hiddenMenu, { hiddenMenuAnnimation: menuCollapsed })}
            >
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
            </Collapse>
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
