import { profileAPI, usersAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { Photo } from "../types/types";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE_POST";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS";

type Post = {
  id: number;
  message: string;
  likesCount: number;
};

type Profile = {
  userId?: number;
  lookingForAJob?: boolean;
  lookingForAJobDescription?: string;
  fullName?: string;
  contacts?: {
    github: string;
    vk: string;
    facebook: string;
    instagram: string;
    twitter: string;
    website: string;
    youtube: string;
    mainLink: string;
  };
  photos?: Photo;
};

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dada", likesCount: 11 },
  ] as Array<Post>,
  profile: null as Profile | null,
  status: "",
  newPostText: "",
};

type InitialStateType = typeof initialState;

const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 5,
        message: action.newPostText,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile };
    }

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };

    case SAVE_PHOTO_SUCCESS:
      debugger;
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    default:
      return state;
  }
};

type PostActionCreatorType = {
  type: typeof ADD_POST;
  newPostText: string;
};

type SetUserProfileType = {
  type: typeof SET_USER_PROFILE;
  profile: Profile;
};

type SetStatusType = {
  type: typeof SET_STATUS;
  status: string;
};

type DeletePostType = {
  type: typeof DELETE_POST;
  postId: number;
};

type SavePhotoSuccessType = {
  type: typeof SAVE_PHOTO_SUCCESS;
  photos: Photo;
};

export const addPostActionCreator = (
  newPostText: string
): PostActionCreatorType => ({
  type: ADD_POST,
  newPostText,
});
export const setUserProfile = (profile: Profile): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});
export const setStatus = (status: string): SetStatusType => ({
  type: SET_STATUS,
  status,
});
export const deletePost = (postId: number): DeletePostType => ({
  type: DELETE_POST,
  postId,
});
export const savePhotoSuccess = (photos: Photo): SavePhotoSuccessType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  const response = await usersAPI.getProfile(userId);
  dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  let response = await profileAPI.getStatus(userId);
  dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error) {
    //
  }
};
export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
};
export const saveProfile =
  (profile: string) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(
        stopSubmit("edit-profile", { _error: response.data.messages[0] })
      );
      return Promise.reject(response.data.messages[0]);
    }
  };

export default profileReducer;
