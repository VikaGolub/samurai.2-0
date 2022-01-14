import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

export type InitialStateType = {
  initialized: boolean;
};

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCCESS;
};

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: "INITIALIZED_SUCCESS",
});

export const initializeApp = () => (dispatch: any) => {
  let promise = dispatch(getAuthUserData());

  //dispatch(somethingelse());
  //dispatch(somethingelse());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
};

export default appReducer;
