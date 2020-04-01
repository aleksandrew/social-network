// outsource dependencies
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import React, { PureComponent } from 'react';

// local dependencies
import Profile from './Profile';
import { PROFILE } from '../../constans/types';
import Preloader from '../../components/preloader/Preloader';
import { selector as authSelector } from '../../redusers/auth-reducer';
import { selector as profileSelector } from '../../redusers/profile-reducer';


class ProfileContainer extends PureComponent {
    refreshProfile () {
        let userId = this.props.match.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
        }

        this.props.reviewUser(userId);
        this.props.getStatus(userId);
    }

    componentDidMount () {
        this.refreshProfile();
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render () {
        const { profile, authorizedUserId } = this.props;

        if (!authorizedUserId) {
            return <Redirect to="/login" />;
        }

        if (!profile) {
            return <Preloader/>;
        }

        return <Profile {...this.props} isOwner={!this.props.match.params.userId} />;
    }
}

ProfileContainer.propTypes = {
    profile: PropTypes.object,
    authorizedUserId: PropTypes.number,
    match: PropTypes.object.isRequired,
    getStatus: PropTypes.func.isRequired,
    reviewUser: PropTypes.func.isRequired,
};

ProfileContainer.defaultProps = {
    profile: {},
    authorizedUserId: false,
};

export default compose(
    connect(
        // mapStateToProps
        (state) => ({
            isAuth: authSelector(state).isAuth,
            status: profileSelector(state).status,
            profile: profileSelector(state).profile,
            authorizedUserId: authSelector(state).userId,
        }),
        // mapDispatchToProps
        (dispatch) => ({
            savePhoto: (file) => dispatch({ type: PROFILE.SAVE_PHOTO, file }),
            reviewUser: (userId) => dispatch({ type: PROFILE.USER_ID, userId }),
            getStatus: (userId) => dispatch({ type: PROFILE.GET_STATUS, userId }),
            updateStatus: (status) => dispatch({ type: PROFILE.UPDATE_STATUS, status }),
        })
    )
)(ProfileContainer);
