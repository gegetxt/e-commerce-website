import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  SET_ORDERS,
} from "../actions/types";

const initialState = {
  user: {},
  addressList: [],   // {Object Array}
  creditCards: [],   // {Object Array}
  orders: [],        // {Object Array}
  roles: [],         // {Object Array}
  theme: "light",
  language: "tr",
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };

    case SET_ROLES:
      return { ...state, roles: action.payload };

    case SET_THEME:
      return { ...state, theme: action.payload };

    case SET_LANGUAGE:
      return { ...state, language: action.payload };

    case SET_ADDRESS_LIST:
      return { ...state, addressList: action.payload };

    case SET_CREDIT_CARDS:
      return { ...state, creditCards: action.payload };

    case SET_ORDERS:
      return { ...state, orders: action.payload };

    default:
      return state;
  }
}