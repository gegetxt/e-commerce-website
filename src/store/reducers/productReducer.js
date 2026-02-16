import {
    SET_CATEGORIES,
    SET_PRODUCT_LIST,
    SET_TOTAL,
    SET_FETCH_STATE,
    SET_LIMIT,
    SET_OFFSET,
    SET_FILTER,
    SET_SORT,
    SET_CATEGORY_ID,
    SET_SELECTED_PRODUCT,
    SET_DETAIL_FETCH_STATE,
  } from "../actions/types";
  
  const initialState = {
    categories: [],      // {Object Array}
    productList: [],     // {Object Array}
    total: 0,            // {Number}
    limit: 25,           // default 25
    offset: 0,           // default 0
    filter: "",          // {String}
    sort: "",            // "price:asc" | "price:desc" | "rating:asc" | "rating:desc"
    categoryId: null,    // {Number | null}
    selectedProduct: null, // {Object | null}
    detailFetchState: "NOT_FETCHED", // "NOT_FETCHED" | "FETCHING" | "FETCHED" | "FAILED"
    fetchState: "NOT_FETCHED", // "NOT_FETCHED" | "FETCHING" | "FETCHED" | "FAILED"
  };
  
  export default function productReducer(state = initialState, action) {
    switch (action.type) {
      case SET_CATEGORIES:
        return { ...state, categories: action.payload };
  
      case SET_PRODUCT_LIST:
        return { ...state, productList: action.payload };
  
      case SET_TOTAL:
        return { ...state, total: action.payload };
  
      case SET_FETCH_STATE:
        return { ...state, fetchState: action.payload };
  
      case SET_LIMIT:
        return { ...state, limit: action.payload };
  
      case SET_OFFSET:
        return { ...state, offset: action.payload };
  
      case SET_FILTER:
        return { ...state, filter: action.payload };
  
      case SET_SORT:
        return { ...state, sort: action.payload };
  
      case SET_CATEGORY_ID:
        return { ...state, categoryId: action.payload };

      case SET_SELECTED_PRODUCT:
        return { ...state, selectedProduct: action.payload };

      case SET_DETAIL_FETCH_STATE:
        return { ...state, detailFetchState: action.payload };
  
      default:
        return state;
    }
  }