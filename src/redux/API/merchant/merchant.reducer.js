import { MerchantsActionTypes } from "./merchant.types";

const INITIAL_STATE = {
  isMerchantsPending: false,
  merchants: [],
  merchantsError: null,

  isMerchantPending: false,
  merchant: {},
  merchantError: null,

  isMerchantByCategoryIdPending: false,
  merchantByCategoryId: {},
  merchantByCategoryIdError: null,

  isMerchantProductsPending: false,
  merchantProducts: [],
  merchantProductsError: null,
};

const MerchantReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case MerchantsActionTypes.GET.GET_MERCHANT_PENDING:
      return {
        ...state,
        isMerchantsPending: true,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_SUCCESS:
      return {
        ...state,
        isMerchantsPending: false,
        merchants: action.payload,
        merchantsError: null,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_ERROR:
      return {
        ...state,
        isMerchantsPending: false,
        merchantsError: action.payload,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_BY_ID_PENDING:
      return {
        ...state,
        isMerchantPending: true,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_BY_ID_SUCCESS:
      return {
        ...state,
        isMerchantPending: false,
        merchant: action.payload,
        merchantError: null,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_BY_ID_ERROR:
      return {
        ...state,
        isMerchantPending: false,
        merchantError: action.payload,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_BY_CATEGORY_ID_PENDING:
      return {
        ...state,
        isMerchantByCategoryIdPending: true,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_BY_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        isMerchantByCategoryIdPending: false,
        merchantsByCategoryId: action.payload,
        merchantByCategoryIdError: null,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_BY_CATEGORY_ID_ERROR:
      return {
        ...state,
        isMerchantByCategoryIdPending: false,
        merchantByCategoryIdError: action.payload,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_PRODUCTS_PENDING:
      return {
        ...state,
        isMerchantProductsPending: true,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_PRODUCTS_SUCCESS:
      return {
        ...state,
        isMerchantProductsPending: false,
        merchantProducts: action.payload,
        merchantProductsError: null,
      };

    case MerchantsActionTypes.GET.GET_MERCHANT_PRODUCTS_ERROR:
      return {
        ...state,
        isMerchantProductsPending: false,
        merchantProductsError: action.payload,
      };

    default:
      return state;
  }
};

export default MerchantReducer;
