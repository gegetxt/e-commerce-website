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
  } from "./types";
  
  export const setCategories = (categories) => ({ type: SET_CATEGORIES, payload: categories });
  export const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList });
  export const setTotal = (total) => ({ type: SET_TOTAL, payload: total });
  export const setFetchState = (fetchState) => ({ type: SET_FETCH_STATE, payload: fetchState });
  export const setLimit = (limit) => ({ type: SET_LIMIT, payload: limit });
  export const setOffset = (offset) => ({ type: SET_OFFSET, payload: offset });
  export const setFilter = (filter) => ({ type: SET_FILTER, payload: filter });
export const setSort = (sort) => ({ type: SET_SORT, payload: sort });
export const setCategoryId = (categoryId) => ({ type: SET_CATEGORY_ID, payload: categoryId });
export const setSelectedProduct = (product) => ({ type: SET_SELECTED_PRODUCT, payload: product });
export const setDetailFetchState = (fetchState) => ({
  type: SET_DETAIL_FETCH_STATE,
  payload: fetchState,
});