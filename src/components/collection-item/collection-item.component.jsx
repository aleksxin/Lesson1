import React from "react";


import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import CustomButton from "../custom-button/custom-button.component";

import './collection-item.styles.scss'

const CollectionItem= ({item, addItem}) => {
    const { name, price, imageUrl} = item;
    return(

    <div className="collection-item">
        <div className="image"
        style={{
            backgroundImage: `url(${imageUrl})`
        }}
        />
        <div className="collection-footer">
            <span className='name'>{name}</span>
            <span className="price">{price}</span>
        </div>
        <CustomButton onClick={() => addItem(item)} inverted2>ADD TO cart</CustomButton>
    </div>
    )
    }

const mapDispatchToProps = dispatch => ({
    addItem: itemm => dispatch(addItem(itemm))
})

export default connect(null,mapDispatchToProps)(CollectionItem); 