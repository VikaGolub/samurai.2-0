import React from "react";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  unfollow,
  toggleFollowingProgress,
  requestUsers,
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getTotalUsersCount,
  getUsers,
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppReducerType } from "../../redux/redux-store";

type Props = {
  currentPage: number;
  pageSize: number;
  getUsers: (pageNumber: number, pageSize: number) => void;
  isFetching: boolean;
  totalUsersCount: number;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  users: Array<UserType>;
};

type MapStateType = {
  currentPage: number;
  pageSize: number;
  isFetching: boolean;
  totalUsersCount: number;
  followingInProgress: Array<number>;
  users: Array<UserType>;
};

type MapDispatchType = {
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
  getUsers: (pageNumber: number, pageSize: number) => void;
  setCurrentPage: any;
  toggleFollowingProgress: any;
};

type PropsComponentType = MapStateType & MapDispatchType;

class UsersContainer extends React.Component<Props> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.getUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.getUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

let mapStateToProps = (state: AppReducerType): MapStateType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};

export default compose(
  connect<MapStateType, MapDispatchType, null, AppReducerType>(
    mapStateToProps,
    {
      follow,
      unfollow,
      setCurrentPage,
      toggleFollowingProgress,
      getUsers: requestUsers,
    }
  )
)(UsersContainer);
