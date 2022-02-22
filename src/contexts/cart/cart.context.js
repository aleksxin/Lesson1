import { createContext } from "react";

const CartContext = createContext({
    hidden: true,
    toggleHiden: () => { }
});

export default CartContext;