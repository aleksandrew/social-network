// outsource dependencies
import { reset } from 'redux-form';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';

// local dependencies
import Header from './Header';
import { AUTH, USERS } from '../../constans/types';
import { selector as authSelector } from '../../redusers/auth-reducer';
import { selector as usersSelector } from '../../redusers/users-reducer';


class HeaderContainer extends PureComponent {
    constructor (props) {
        super(props);

        this.state = {
            photos: null,
        };
    }

    componentDidMount () {
        const primeryProfile = localStorage.getItem('primeryProfile');

        if (primeryProfile) {
            const photos = JSON.parse(primeryProfile)[0].photos;

            this.setState(() => ({ photos }));
        }
    }

    render () {
        return <Header photos={this.state.photos} {...this.props} />;
    }
}

export default connect(
    // mapStateToProps
    (state) => ({
        isAuth: authSelector(state).isAuth,
        findingUsers: usersSelector(state).findingUsers,
        searchString: usersSelector(state).searchString,
        searchWindow: usersSelector(state).searchWindow,
    }),
    // mapDispatchToProps
    (dispatch) => ({
        logout: () => dispatch({ type: AUTH.LOGOUT }),
        cleanInputForm: () => dispatch(reset('search')),
        closeWindow: () => dispatch({ type: USERS.CLOSE_SEARCH_WINDOW }),
        searchUsers: (term) => dispatch({ type: USERS.SEARCH_USERS, term }),
        cleanSearchUsers: () => dispatch({ type: USERS.CLEAN_SEARCH_USERS }),
    })
)(HeaderContainer);
