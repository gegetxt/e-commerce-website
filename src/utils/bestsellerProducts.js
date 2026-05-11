export const BESTSELLER_TABS = [
  { label: "Men", gender: "e" },
  { label: "Women", gender: "k" },
  { label: "Accessories" },
];

export const BESTSELLER_FETCH_LIMIT = 1000;

const normalizeId = (value) => (value == null ? "" : String(value));

const normalizeGender = (value) => (value == null ? "" : String(value).trim().toLowerCase());

const compareByBestSellerRank = (a, b) => {
  const sellCountDiff = (Number(b.sell_count) || 0) - (Number(a.sell_count) || 0);

  if (sellCountDiff !== 0) {
    return sellCountDiff;
  }

  return (Number(a.id) || 0) - (Number(b.id) || 0);
};

export const getProductCategoryId = (product) =>
  product?.category_id ?? product?.categoryId ?? product?.category?.id;

export const buildCategoryById = (categories = []) => {
  const map = new Map();

  categories.forEach((category) => {
    if (category?.id != null) {
      map.set(normalizeId(category.id), category);
    }
  });

  return map;
};

export const getCategoryByProduct = (product, categoryById) =>
  categoryById.get(normalizeId(getProductCategoryId(product)));

export const getCategoryTitle = (product, categoryById) => {
  const category = getCategoryByProduct(product, categoryById);

  return (
    product?.category?.title ||
    product?.category?.name ||
    category?.title ||
    category?.name ||
    category?.categoryName ||
    "Kategori"
  );
};

export const getBestSellerProductsForTab = (
  products = [],
  categoryById,
  activeTabIndex,
  limit = 6
) => {
  const activeGender = BESTSELLER_TABS[activeTabIndex]?.gender;
  const hasCategoryLookup = categoryById?.size > 0;

  return [...products]
    .filter((product) => {
      if (!activeGender) return true;

      const category = getCategoryByProduct(product, categoryById);
      const productGender =
        product?.category?.gender ||
        product?.category_gender ||
        product?.categoryGender ||
        category?.gender;

      if (!productGender && !hasCategoryLookup) return true;

      return normalizeGender(productGender) === activeGender;
    })
    .sort(compareByBestSellerRank)
    .slice(0, limit);
};

export const getTopBestSellerProducts = (products = [], limit = 4) =>
  [...products].sort(compareByBestSellerRank).slice(0, limit);
