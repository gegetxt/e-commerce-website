export const BESTSELLER_TABS = [
  { label: "Men", gender: "e" },
  { label: "Women", gender: "k" },
  { label: "Accessories" },
];

export const BESTSELLER_FETCH_LIMIT = 1000;

const normalizeId = (value) => (value == null ? "" : String(value));

const normalizeGender = (value) => (value == null ? "" : String(value).trim().toLowerCase());

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
    .sort((a, b) => (Number(b.sell_count) || 0) - (Number(a.sell_count) || 0))
    .slice(0, limit);
};

export const getCategoryDistinctBestSellers = (products = [], limit = 4) => {
  const sortedProducts = [...products].sort(
    (a, b) => (Number(b.sell_count) || 0) - (Number(a.sell_count) || 0)
  );
  const bestByCategory = new Map();

  sortedProducts.forEach((product) => {
    const categoryId = normalizeId(getProductCategoryId(product));
    const key = categoryId || `product:${product?.id}`;

    if (!bestByCategory.has(key)) {
      bestByCategory.set(key, product);
    }
  });

  const categoryWinners = Array.from(bestByCategory.values()).slice(0, limit);

  if (categoryWinners.length >= limit) {
    return categoryWinners;
  }

  const selectedIds = new Set(categoryWinners.map((product) => product?.id));
  const fillers = sortedProducts
    .filter((product) => !selectedIds.has(product?.id))
    .slice(0, limit - categoryWinners.length);

  return [...categoryWinners, ...fillers];
};
