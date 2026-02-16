import { setRoles, setAddressList, setCreditCards, setOrders } from "./clientActions";
import { toast } from "react-toastify";
import { api, setAuthToken, clearAuthToken } from "../../api/axios";
import { setUser } from "./clientActions";
import {
  setCategories,
  setFetchState,
  setProductList,
  setTotal,
  setSelectedProduct,
  setDetailFetchState,
} from "./productActions";

export const fetchCategoriesThunk = () => {
  return async (dispatch, getState) => {
    const { categories } = getState().product;
    if (categories && categories.length) return; // ihtiyaç yoksa tekrar çekme

    try {
      dispatch(setFetchState("FETCHING"));
      const res = await api.get("/categories");

      // bazı API'ler {categories:[...]} döner, bazıları direkt [...]
      const list = res.data?.categories || res.data;

      dispatch(setCategories(list));
      dispatch(setFetchState("FETCHED"));
    } catch (e) {
      dispatch(setFetchState("FAILED"));
      console.error(e);
    }
  };
};

export const fetchProductsThunk = () => {
  return async (dispatch, getState) => {
    const { limit, offset, filter, sort, categoryId } = getState().product;

    try {
      dispatch(setFetchState("FETCHING"));

      const params = {};
      if (Number.isFinite(limit)) params.limit = limit;
      if (Number.isFinite(offset)) params.offset = offset;
      if (filter) params.filter = filter;
      if (sort) params.sort = sort;
      if (categoryId) params.category = categoryId;

      const res = await api.get("/products", { params });
      const list = res.data?.products || res.data || [];
      const total = res.data?.total ?? (Array.isArray(list) ? list.length : 0);

      dispatch(setProductList(list));
      dispatch(setTotal(total));
      dispatch(setFetchState("FETCHED"));
    } catch (e) {
      dispatch(setFetchState("FAILED"));
      console.error(e);
    }
  };
};

export const fetchProductDetailThunk = (productId) => {
  return async (dispatch) => {
    if (!productId) return;

    try {
      dispatch(setDetailFetchState("FETCHING"));
      const res = await api.get(`/products/${productId}`);
      const product = res.data?.product || res.data;
      dispatch(setSelectedProduct(product));
      dispatch(setDetailFetchState("FETCHED"));
    } catch (e) {
      dispatch(setDetailFetchState("FAILED"));
      console.error(e);
    }
  };
};

export const fetchAddressListThunk = () => {
  return async (dispatch) => {
    try {
      const res = await api.get("/user/address");
      dispatch(setAddressList(res.data || []));
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const createAddressThunk = (payload) => {
  return async (dispatch) => {
    try {
      await api.post("/user/address", payload);
      await dispatch(fetchAddressListThunk());
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const updateAddressThunk = (payload) => {
  return async (dispatch) => {
    try {
      await api.put("/user/address", payload);
      await dispatch(fetchAddressListThunk());
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const deleteAddressThunk = (addressId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/user/address/${addressId}`);
      await dispatch(fetchAddressListThunk());
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const fetchCardsThunk = () => {
  return async (dispatch) => {
    try {
      const res = await api.get("/user/card");
      dispatch(setCreditCards(res.data || []));
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const createCardThunk = (payload) => {
  return async (dispatch) => {
    try {
      await api.post("/user/card", payload);
      await dispatch(fetchCardsThunk());
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const updateCardThunk = (payload) => {
  return async (dispatch) => {
    try {
      await api.put("/user/card", payload);
      await dispatch(fetchCardsThunk());
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const deleteCardThunk = (cardId) => {
  return async (dispatch) => {
    try {
      await api.delete(`/user/card/${cardId}`);
      await dispatch(fetchCardsThunk());
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const fetchOrdersThunk = () => {
  return async (dispatch) => {
    try {
      const res = await api.get("/order");
      dispatch(setOrders(res.data || []));
      return { ok: true };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};

export const createOrderThunk = (payload) => {
  return async (dispatch) => {
    try {
      const res = await api.post("/order", payload);
      return { ok: true, data: res.data };
    } catch (e) {
      console.error(e);
      return { ok: false };
    }
  };
};
export const verifyTokenThunk = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");

    // token yoksa hiçbir şey yapma
    if (!token) return { ok: false, reason: "no_token" };

    try {
      // 1) axios header'a token koy
      setAuthToken(token);

      // 2) /verify isteği
      const res = await api.get("/verify");

      // Beklenen: { user: {...}, token: "..." } veya benzeri
      const user = res.data?.user || res.data;
      const newToken = res.data?.token;

      // 3) user reducer'a yaz
      dispatch(setUser(user));

      // 4) token yenile (varsa)
      if (newToken) {
        localStorage.setItem("token", newToken);
        setAuthToken(newToken);
      } else {
        // backend aynı token'ı kullanıyorsa, mevcut token zaten duruyor
        localStorage.setItem("token", token);
        setAuthToken(token);
      }

      return { ok: true, user };
    } catch (err) {
      // 5) yetkisizse token temizle
      localStorage.removeItem("token");
      clearAuthToken();
      dispatch(setUser({})); // logged out state

      return { ok: false, reason: "unauthorized" };
    }
  };
};
// İstersen fetchState gibi bir alanı client'ta da tutabilirdin ama requirement istemiyor.
// Bu yüzden sadece "roles dolu mu?" kontrolü yapıyoruz.
export const loginThunk = ({ email, password, remember }) => {
    return async (dispatch) => {
      try {
        const res = await api.post("/login", { email, password });
        const data = res.data;
        // beklenen: { token: "...", user: {...} } (değilse backend’e göre uyarlarsın)
        const token = data?.token;
        const user = data?.user || data; // bazı API’ler direkt user döner
  
        dispatch(setUser(user));
  
        if (token) {
          setAuthToken(token);
        }

        if (remember && token) {
          localStorage.setItem("token", token);
        } else {
          localStorage.removeItem("token");
        }
  
        toast.success("Giriş başarılı!");
        return { ok: true, user };
      } catch (e) {
        const msg = e?.response?.data?.message || "Giriş başarısız";
        toast.error(msg);
        return { ok: false, message: msg };
      }
    };
  };
export const fetchRolesIfNeeded = () => {
  return async (dispatch, getState) => {
    const { roles } = getState().client;

    // ✅ Only if needed:
    if (Array.isArray(roles) && roles.length > 0) return;

    try {
      // ÖRNEK endpoint: kendi backend'ine göre değiştir
      const res = await fetch("/api/roles");
      if (!res.ok) throw new Error("Roles fetch failed");
      const data = await res.json();

      dispatch(setRoles(data));
    } catch (err) {
      // İstersen burada ayrıca bir hata action'ı da tanımlarsın
      console.error(err);
    }
  };
};