

export const addItemToCart = (cartIms, cartItemtoAdd) => {
    const existingCartItem = cartIms.find(
        cartItem => cartItem.id === cartItemtoAdd.id
    );

    if (existingCartItem) {
        return cartIms.map(cartItem =>
            cartItem.id === cartItemtoAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }


    return [...cartIms, { ...cartItemtoAdd, quantity: 1 }];
};

export const decreaseIteFromCart = (cartItems, cartItemToDecrease) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToDecrease.id
    );

    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToDecrease.id);
    }

    return cartItems.map(cartItem =>
        cartItem.id === cartItemToDecrease.id ?
            {
                ...cartItem, quantity: cartItem.quantity - 1
            }
            : cartItem

    );
};

export const filterItemFromCart = (cartItems, item) => cartItems.filter(
    cartItem => cartItem.id !== item.id
);

export const getCartItemsCount = cartItems => cartItems.reduce(
    (accumulatedQuantity, cartItem) =>
        accumulatedQuantity + cartItem.quantity, 0
);