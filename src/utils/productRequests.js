import { api } from "../api/axios";

const productsCache = new Map();
const pendingProductsRequests = new Map();

const createCacheKey = (params = {}) =>
  Object.entries(params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}:${value}`)
    .join("|");

export const fetchProductsCached = async (params = {}) => {
  const cacheKey = createCacheKey(params);

  if (productsCache.has(cacheKey)) {
    return productsCache.get(cacheKey);
  }

  if (pendingProductsRequests.has(cacheKey)) {
    return pendingProductsRequests.get(cacheKey);
  }

  const request = api
    .get("/products", { params })
    .then((res) => {
      const list = res.data?.products || res.data || [];
      productsCache.set(cacheKey, list);
      return list;
    })
    .finally(() => {
      pendingProductsRequests.delete(cacheKey);
    });

  pendingProductsRequests.set(cacheKey, request);
  return request;
};
