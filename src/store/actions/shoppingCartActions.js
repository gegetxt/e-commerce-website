import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  TOGGLE_CART_ITEM,
  INCREMENT_CART_ITEM,
  DECREMENT_CART_ITEM,
  CLEAR_CART,
} from "./types";

export const setCart = (cart) => ({ type: SET_CART, payload: cart });
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment });
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address });
export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId });
export const toggleCartItem = (productId) => ({ type: TOGGLE_CART_ITEM, payload: productId });
export const incrementCartItem = (productId) => ({
  type: INCREMENT_CART_ITEM,
  payload: productId,
});
export const decrementCartItem = (productId) => ({
  type: DECREMENT_CART_ITEM,
  payload: productId,
});
export const clearCart = () => ({ type: CLEAR_CART });