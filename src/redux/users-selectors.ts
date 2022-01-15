import { createSelector } from "reselect";
import { AppReducerType } from "./redux-store";

const getUsersSelector = (state: AppReducerType) => {
  return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state: AppReducerType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppReducerType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppReducerType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppReducerType) => {
  return state.usersPage.isFetching;
};
export const getFollowingInProgress = (state: AppReducerType) => {
  return state.usersPage.followingInProgress;
};

export const countSomethingDifficult = (state: AppReducerType) => {
  debugger;
  //for... math... big arrays
  let count = 23;
  return count;
};
