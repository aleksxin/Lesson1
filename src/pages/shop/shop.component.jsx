import React from "react";
import { Route, Routes } from "react-router-dom";

import CollectionPage from "../category/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.componenet";

import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";
import { collection, onSnapshot } from "firebase/firestore";

import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
//import Collec from "../../components/collections-overview/collections-overview.componenet";
import WithSpinner from "../../components/with-spinner/with-spinner.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {
    state = {
        loading: true
    };
    unsubsribeFromSnapshot = null;


    componentDidMount() {
        const {updateCollections}=this.props;
        const CollectionRef=collection(firestore,'collections');


        this.unsubsribeFromSnapshot = onSnapshot(CollectionRef, async snapshot=> {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading: false });
        });
    }

   render (){
      // const { match } = this.props;     
      const { loading }=this.state;   
    return (
    <div className='shop-page'>
        <Routes>
            <Route path='/' element={<CollectionsOverviewWithSpinner isLoading={loading}/>}/>
            <Route path=":collectionId" element={<CollectionPageWithSpinner isLoading={loading} animate={true}/>}/>
        </Routes>
    </div>);
   }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);