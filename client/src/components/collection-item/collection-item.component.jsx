import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";

import { CollectionItemContainer, CollectionFooterContainer, AddButton, BackgroundImage, NameContainer, PriceContainer } from "./collection-item.styles";

const CollectionItem = ({ item, addItem }) => {
    const { name, price, imageUrl } = item;
    return (

        <CollectionItemContainer>
            <BackgroundImage className="image"
                imageUrl={imageUrl}
            />
            <CollectionFooterContainer>
                <NameContainer>{name}</NameContainer>
                <PriceContainer>{price}</PriceContainer>
            </CollectionFooterContainer>
            <AddButton onClick={() => addItem(item)} inverted>ADD TO cart</AddButton>
        </CollectionItemContainer>
    );
};

const mapDispatchToProps = dispatch => ({
    addItem: itemm => dispatch(addItem(itemm))
});

export default connect(null, mapDispatchToProps)(CollectionItem); 