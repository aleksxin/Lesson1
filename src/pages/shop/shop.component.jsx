import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import CollectionPageContainer from "../category/collection.container";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";

import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";



const ShopPage = ({ fetchCollectionsStart }) => {

    useEffect(() => {
        const { fetchCollectionsStart } = this.props;

        fetchCollectionsStart();
    }, [fetchCollectionsStart]);


    return (
        <div className='shop-page'>
            <Routes>
                <Route path='/' element={<CollectionsOverviewContainer />} />
                <Route path=":collectionId" element={<CollectionPageContainer />} />
            </Routes>
        </div>);

};

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(null, mapDispatchToProps)(ShopPage);