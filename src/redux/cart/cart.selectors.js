import { createSelector } from "reselect";

const selectCart = state => state.cart;

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.cartItems
);

export const selectCartHudden=createSelector(
    [selectCart],
    cart=> cart.hidden
)

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    cartItems => cartItems.reduce((accumlatedQuantity, cartItem)=> accumlatedQuantity+cartItem.quantity,0)
)