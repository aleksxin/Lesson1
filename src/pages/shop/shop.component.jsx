import React from "react";
import { Route, Routes } from "react-router-dom";
import CollectionPage from "../category/collection.component";
import CollectionsOverview from "../../components/collections-overview/collections-overview.componenet";

//import Collec from "../../components/collections-overview/collections-overview.componenet";


const ShopPage=() => {
   // console.log(match);
    return (
    <div className='shop-page'>
        <Routes>
            <Route path='/' element={<CollectionsOverview/>}/>
            <Route path=":collectionId" element={<CollectionPage animate={true}/>}/>
        </Routes>
    </div>);
}


export default ShopPage;