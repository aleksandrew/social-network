// outsource dependencies
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

// local dependencies
import Users from './Users';
import { USERS } from '../../constans/types';
import { selector } from '../../redusers/users-reducer';
import Preloader from '../../components/preloader/Preloader';


class UsersContainer extends PureComponent {
    constructor (props) {
        super(props);

        this.onPageChanged = this.onPageChanged.bind(this);
    }

    componentDidMount () {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged (pageNumber) {
        window.scrollTo(0, 0);
        this.props.requestUsers(pageNumber, this.props.pageSize);
    }

    render () {
        if (this.props.isFetching) {
            return <Preloader/>;
        }

        return <Users {...this.props} onPageChanged={this.onPageChanged}/>;
    }
}

UsersContainer.propTypes = {
    pageSize: PropTypes.number.isRequired,
    isFetching: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    requestUsers: PropTypes.func.isRequired,
};

export default compose(
    connect(
        // mapStateToProps
        (state) => ({
            users: selector(state).users,
            pageSize: selector(state).pageSize,
            isFetching: selector(state).isFetching,
            currentPage: selector(state).currentPage,
            totalUsersCount: selector(state).totalUsersCount,
            followingInProgress: selector(state).followingInProgress,
        }),
        // mapDispatchToProps
        (dispatch) => ({
            follow: (userId) => dispatch({ type: USERS.FOLLOW, userId }),
            unfollow: (userId) => dispatch({ type: USERS.UNFOLLOW, userId }),
            userRemove: (userId) => dispatch({ type: USERS.USER_REMOVE, userId }),
            setCurrentPage: (currentPage) => dispatch({ type: USERS.SET_CURRENT_PAGE, currentPage }),
            requestUsers: (page, pageSize) => dispatch({ type: USERS.REQUEST_USERS, currentPage: page, pageSize }),
        })
    ),
)(UsersContainer);
