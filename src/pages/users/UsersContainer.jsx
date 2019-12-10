import React from "react";
import {
  follow, requestUsers,
  setCurrentPage, unfollow
} from "../../redux/user-reduce";
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../../components/preloader/Preloader";
import {compose} from "redux";
import {getCurrentPage, getFollowingInProgress, getIsFetching,
  getPageSize, getTotalUsersCount, getUsers
} from "../../redux/users-selectors";

class UsersContainer extends React.PureComponent {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = pageNumber => {
    this.props.requestUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return <>
      {this.props.isFetching ? <Preloader/> : null}

      <Users totalUsersCount={this.props.totalUsersCount}
             pageSize={this.props.pageSize}
             currentPage={this.props.currentPage}
             onPageChanged={this.onPageChanged}
             users={this.props.users}
             follow={this.props.follow}
             unfollow={this.props.unfollow}
             followingInProgress ={this.props.followingInProgress}
      />
    </>
  }
}

const mapStateToProps = state => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state)
  }
};

export default compose(
  connect(mapStateToProps, {
    follow, unfollow, requestUsers,
    setCurrentPage
  })
)(UsersContainer);

