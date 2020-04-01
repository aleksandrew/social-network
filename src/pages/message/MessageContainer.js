// outsource dependencies
import { compose } from 'redux';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

// local dependencies
import Message from './Message';
import { MESSAGE } from '../../constans/types';
import { selector as usersSelector } from '../../redusers/users-reducer';
import { selector as messageSelector } from '../../redusers/message-reducer';

class MessageContainer extends PureComponent {
    // componentDidMount () {
    //     this.props.setAllUsers()
    // }

    render () {
        return <Message {...this.props} />;
    }
}

export default compose(
    connect(
        // mapStateToProps
        (state) => ({
            messages: messageSelector(state).messages,
            profile: localStorage.getItem('primeryProfile'),
            getIsFetching: usersSelector(state).getIsFetching,
            getFollowedUsers: usersSelector(state).getFollowedUsers,
        }),
        // mapDispatchToProps
        (dispatch) => ({
            // setAllUsers: () => dispatch({ type: USERS.SET_ALL_USERS }),
            isMarkRead: (id) => dispatch({ type: MESSAGE.SET_MARK, id }),
        })
    ),
    withRouter,
)(MessageContainer);
