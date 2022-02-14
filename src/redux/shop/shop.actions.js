import { collection, getDocs } from "firebase/firestore";
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop.type";

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECNTIONS_START,
});

export const fetchCollectionsSucess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
  return async (dispatch) => {
    const collectionRef = collection(firestore, "collections");
    dispatch(fetchCollectionsStart());
    try {
      const snapshot = await getDocs(collectionRef);

      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      //updateCollections(collectionsMap);
      dispatch(fetchCollectionsSucess(collectionsMap));
    } catch (error) {
      dispatch(fetchCollectionsFailure(error.message));
    }
  };
};
