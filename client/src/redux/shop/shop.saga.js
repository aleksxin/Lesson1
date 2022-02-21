import { collection, getDocs } from "firebase/firestore";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { convertCollectionsSnapshotToMap, firestore } from "../../firebase/firebase.utils";
import { fetchCollectionsFailure, fetchCollectionsSucess } from "./shop.actions";
import ShopActionTypes from "./shop.type";

export function* fetchCollectionAsybc() {
  try {
    const collectionRef = collection(firestore, "collections");
    const snapshot = yield getDocs(collectionRef);
    const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    yield put(fetchCollectionsSucess(collectionMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }

  // try{
  // const snapshot = await getDocs(collectionRef);

  // const collectionsMap = convertCollectionsSnapshotToMaphotToMap(snapshot);
  // //updateCollections(collectionsMap);
  // dispatch(fetchCollectionsSucess(collectionsMap));
  // }
  // catch(error){
  //     dispatch(fetchCollectionsFailure(error.message));
  // }
}

export function* fetchCollectionStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECNTIONS_START,
    fetchCollectionAsybc
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionStart)]);
}