import React from 'react';
import {  useParams } from 'react-router-dom';

import CollectionItem from '../../components/collection-item/collection-item.component';
import { useSelector } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selector';

import './collection.styles.scss';

const CollectionPage = () => {
    const {collectionId}=useParams();
    //console.log(collectionId);
    const {title, items} = useSelector(selectCollection(collectionId));
    //console.log(collection);

    return(
    <div className='collection-page'>
        <h2 className='title'>{title}</h2>
        <div className='items'>
            {
                items.map(item => (<CollectionItem key={item.id} item={item}/>))
            }
            </div>

    </div>
)}

//const mapStateToProps = (state, ownProps) => ({
//    colelction: selectCollection(ownProps)
//})

export default CollectionPage;