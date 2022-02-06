import { createUserWithEmailAndPassword } from "firebase/auth";

export const addItemToCart = (cartIms, cartItemtoAdd) => {
    const existingCartItem = cartIms.find(
        cartItem => cartItem.id===cartItemtoAdd.id
    );

    if (existingCartItem) {
        return cartIms.map(cartItem =>
            cartItem.id === cartItemtoAdd.id
            ? {...cartItem, quantity: cartItem.quantity+1}
            : cartItem
        )
    }


    return [...cartIms, {...cartItemtoAdd,quantity:1}]
}