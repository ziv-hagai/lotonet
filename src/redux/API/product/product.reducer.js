import { ProductsActionTypes } from "./product.types";

const INITIAL_STATE = {
  isProductsPending: false,
  originalProducts: [],
  products: [],
  productsError: false,

  isProductPending: false,
  product: {},
  productError: false,

  filter: {}
};

const ProductsReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case ProductsActionTypes.GET.GET_PRODUCT_PENDING:
      return {
        ...state,
        isProductsPending: true,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        isProductsPending: false,
        products: action.payload,
        originalProducts: action.payload,
        productsError: null,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_ERROR:
      return {
        ...state,
        isProductsPending: false,
        productsError: action.payload,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_BY_ID_PENDING:
      return {
        ...state,
        isProductPending: true,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        isProductPending: false,
        product: action.payload,
        productError: null,
      };

    case ProductsActionTypes.GET.GET_PRODUCT_BY_ID_ERROR:
      return {
        ...state,
        isProductPending: false,
        productError: action.payload,
      };


    case ProductsActionTypes.SET.PRODUCT_FILTER:
      return {
        ...state,
        filter: action.payload,
        products: state.originalProducts.filter(product => {
          if (action.payload?.price) {
            return true
          }

          return true
        })
      };

    default:
      return state;
  }
};

export default ProductsReducer;
