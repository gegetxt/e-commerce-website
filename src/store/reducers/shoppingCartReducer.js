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
} from "../actions/types";

const initialState = {
  cart: [
    // { count: 1, product: { id: "1235", ... } }
  ],
  payment: {},  // {Object}
  address: {},  // {Object}
};

export default function shoppingCartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return { ...state, cart: action.payload };

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };

    case ADD_TO_CART: {
      const product = action.payload;
      if (!product?.id) return state;

      const existingIndex = state.cart.findIndex((item) => item.product?.id === product.id);
      if (existingIndex >= 0) {
        const updated = state.cart.map((item, idx) =>
          idx === existingIndex ? { ...item, count: item.count + 1 } : item
        );
        return { ...state, cart: updated };
      }

      const nextItem = { count: 1, checked: true, product };
      return { ...state, cart: [...state.cart, nextItem] };
    }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item.product?.id !== action.payload),
      };

    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product?.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };

    case INCREMENT_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product?.id === action.payload ? { ...item, count: item.count + 1 } : item
        ),
      };

    case DECREMENT_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product?.id === action.payload && item.count > 1
            ? { ...item, count: item.count - 1 }
            : item
        ),
      };

    case CLEAR_CART:
      return { ...state, cart: [] };

    default:
      return state;
  }
}