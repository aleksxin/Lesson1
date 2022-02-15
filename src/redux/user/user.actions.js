import UserActionTypes from "./user.types";

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const signSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
});

export const signInFailure = error => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: error
});

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutFailure = (error) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: error
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signUpInit = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_INITIALIZE,
    payload: userCredentials
});

export const signUpSuccessLogin = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS_AND_LOGIN,
    payload: { user, additionalData }
});

export const signUpFail = (error) => ({
    type: UserActionTypes.SIGN_UP_FAIL,
    payload: error
});