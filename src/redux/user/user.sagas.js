import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";

import { all, call, put, takeLatest } from "redux-saga/effects";
import { auth, createUserProfileDocument, getCurrentUser, gooogleProvider } from "../../firebase/firebase.utils";
import { signInFailure, signOutFailure, signOutSuccess, signSuccess, signUpFail, signUpSuccessLogin } from "./user.actions";
import UserActionTypes from "./user.types";

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield getDoc(userRef);
        yield put(signSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        // console.log(userRef);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithGoogle() {
    try {
        const { user } = yield signInWithPopup(auth, gooogleProvider);
        yield getSnapshotFromUserAuth(user);

        // console.log(userRef);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield signInWithEmailAndPassword(auth, email, password);
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);

    } catch (error) {
        yield put(signInFailure(error));
    }
}

export function* singOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

export function* signUpWithEmailAndPasswor({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield createUserWithEmailAndPassword(auth, email, password);
        //const {user} = await auth.createUserWithEmailAndPassword(email,password);
        yield put(signUpSuccessLogin({ user, additionalData: { displayName } }));
        yield createUserProfileDocument(user, { displayName });
    } catch (error) {
        yield put(signUpFail(error));
    }


}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
    // try{
    yield getSnapshotFromUserAuth(user, additionalData);
    // put(emailSignInStart());
    // }catch (error) {
    // yield put(signInFailure(error));
    // }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, singOut);
}

export function* onSignUpInit() {
    yield takeLatest(UserActionTypes.SIGN_UP_INITIALIZE, signUpWithEmailAndPasswor);
}

export function* onSignUpSucess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS_AND_LOGIN, signInAfterSignUp);
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(onCheckUserSession), call(onSignOutStart), call(onSignUpInit), call(onSignUpSucess)]);

}

