import {
  SET_USER,
  SET_ROLES,
  SET_THEME,
  SET_LANGUAGE,
  SET_ADDRESS_LIST,
  SET_CREDIT_CARDS,
  SET_ORDERS,
} from "./types";

export const setUser = (user) => ({ type: SET_USER, payload: user });
export const setRoles = (roles) => ({ type: SET_ROLES, payload: roles });
export const setTheme = (theme) => ({ type: SET_THEME, payload: theme });
export const setLanguage = (language) => ({ type: SET_LANGUAGE, payload: language });
export const setAddressList = (addressList) => ({ type: SET_ADDRESS_LIST, payload: addressList });
export const setCreditCards = (cards) => ({ type: SET_CREDIT_CARDS, payload: cards });
export const setOrders = (orders) => ({ type: SET_ORDERS, payload: orders });