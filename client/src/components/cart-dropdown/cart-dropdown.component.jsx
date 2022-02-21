import React from "react";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from '../../redux/cart/cart.actions.js';


import './cart-dropdown.styles.scss';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";



const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const navigate = useNavigate();

    const dispatch = useDispatch();
    return (
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ? (
                        cartItems.map(cartItem => (<CartItem key={cartItem.id} item={cartItem} />)
                        )) : (
                        <span className="empty-message">
                            Your cart is empty
                        </span>
                    )}
            </div>
            <CustomButton onClick={() => {
                navigate('/checkout');
                dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</CustomButton>
        </div>
    );
};



export default CartDropdown;