import { ProductCategoryActionsTypes } from "./productCategories.types";

const INITIAL_STATE = {
  isProductCategoriesPending: false,
  originalProductCategories: [],
  productCategories: [],
  productCategoriesError: null,

  isProductCategoryPending: false,
  productCategory: {},
  productCategoryError: null,

  isProductsCategoryPending: false,
  productsCategory: [],
  productsCategoryError: null,

  filter: {}
};

const ProductCategoryReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_PENDING:
      return {
        ...state,
        isProductCategoriesPending: true,
      };

    case ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_SUCCESS:
      return {
        ...state,
        isProductCategoriesPending: false,
        productCategories: action.payload,
        originalProductCategories: action.payload,
        productCategoriesError: null,
      };

    case ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_ERROR:
      return {
        ...state,
        isProductCategoriesPending: false,
        productCategoriesError: action.payload,
      };

    case ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_BY_ID_PENDING:
      return {
        ...state,
        isProductCategoryPending: true,
      };

    case ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        isProductCategoryPending: false,
        productCategory: action.payload,
        productCategoryError: null,
      };

    case ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_BY_ID_ERROR:
      return {
        ...state,
        isProductCategoryPending: false,
        productCategoryError: action.payload,
      };

    case ProductCategoryActionsTypes.GET.GET_PRODUCTS_BY_CATEGORY_ID_PENDING:
      return {
        ...state,
        isProductsCategoryPending: true,
      };

    case ProductCategoryActionsTypes.GET.GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        isProductsCategoryPending: false,
        productsCategory: action.payload,
        productsCategoryError: null,
      };

    case ProductCategoryActionsTypes.GET.GET_PRODUCTS_BY_CATEGORY_ID_ERROR:
      return {
        ...state,
        isProductsCategoryPending: false,
        productsCategoryError: action.payload,
      };

    case ProductCategoryActionsTypes.SET.PRODUCT_CATEGORY_FILTER:
      const productCategories = []
      const originalProductCategories = [...state.originalProductCategories]
        .filter(productCategory => {
          if (action.payload?.id) {
            return productCategory.id === action.payload.id
          }

          return true
        })
      originalProductCategories.forEach(productCategory => {
        const newProductCategory = {...productCategory}
        if (action.payload?.price) {
          if (newProductCategory?.products?.length) {
            newProductCategory.products = newProductCategory.products.filter(product => {
              if (product?.price) {
                const minPrice = action.payload.price[0]
                const maxPrice = action.payload.price[1]

                return minPrice <= product.price && product.price <= maxPrice
              }

              return false
            })
          }
        }

        productCategories.push(newProductCategory)
      })
      return {
        ...state,
        filter: action.payload,
        productCategories
      };

    default:
      return state;
  }
};

export default ProductCategoryReducer;
