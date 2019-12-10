import React from 'react';
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, reviewUser, setUserProfile, updateStatus} from "../../redux/profile-reducer";
import {withRouter, Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.PureComponent {

  componentDidMount() {
    let userId = this.props.match.params.userId;

    if (!userId) {
      userId = this.props.authorizedUserId;

      if (!userId) {
        this.props.history.push('/login')
      }
    }

    this.props.reviewUser(userId);
    this.props.getStatus(userId)
  }

  render() {

    return (
      this.props.profile && <Profile {...this.props}
                                     profile={this.props.profile}
                                     isAuth={this.props.isAuth}
                                     updateStatus={this.props.updateStatus}/>
    )
  }
}

const mapStateToProps = state => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {setUserProfile, reviewUser, getStatus, updateStatus}),
  withRouter, withAuthRedirect)(ProfileContainer);
