import { createAction } from "../../util/reducer/reducer"
import { CART_TYPE_ACTIONS } from "./cart.type"





const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(item => item.id === productToAdd.id)
    if (existingItem) {
        return cartItems.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item)
    }
    else if (!existingItem) {
        return [...cartItems, { ...productToAdd, quantity: 1 }]
    }
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === productToRemove.id)

    if (existingItemIndex >= 0) {
        const newCartItems = [...cartItems.slice(0, existingItemIndex), ...cartItems.slice(existingItemIndex + 1)]
        return newCartItems
    }

    return cartItems
}

// export const totalPriceCartItems = (cartItems) => {
//     return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
// }

const decreaseItem = (cartItems, productToDecrease) => {
    const existingItem = cartItems.find(item => item.id === productToDecrease.id);
    if (!existingItem) {
        return cartItems;
    }
    const updatedCartItems = cartItems.map(item => {
        if (item.id !== productToDecrease.id) {
            return item;
        }
        const updatedQuantity = item.quantity - 1;
        if (updatedQuantity < 1) {
            return null;
        }
        return {
            ...item,
            quantity: updatedQuantity,
        };
    });
    return updatedCartItems.filter(Boolean);
};





export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd)
    return createAction(CART_TYPE_ACTIONS.SET_CART_ITEMS, newCartItems)
}
export const removeItemFromCart = (cartItems, productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove)
    return createAction(CART_TYPE_ACTIONS.SET_CART_ITEMS, newCartItems)
}
export const itemDecrease = (cartItems, productToDecrease) => {
    const newCartItems = decreaseItem(cartItems, productToDecrease)
    return createAction(CART_TYPE_ACTIONS.SET_CART_ITEMS, newCartItems)
}
export const setIsCartOpen = (isCartOpen) => {
    return createAction(CART_TYPE_ACTIONS.SET_IS_CART_OPEN, isCartOpen)
}