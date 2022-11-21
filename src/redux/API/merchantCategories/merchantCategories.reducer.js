import { MerchantCategoryActionsTypes } from "./merchantCategories.types";

const INITIAL_STATE = {
  isMerchantCategoriesPending: false,
  originalMerchantCategories: [],
  MerchantCategories: [],
  MerchantCategoriesError: null,

  isMerchantCategoryPending: false,
  merchantCategory: {},
  merchantCategoryError: null,

  isMerchantsCategoryPending: false,
  merchantsCategory: [],
  MerchantsCategoryError: null,

  filter: {}
};

const MerchantCategoryReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_PENDING:
      return {
        ...state,
        isMerchantCategoriesPending: true,
      };

    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_SUCCESS:
      return {
        ...state,
        isMerchantCategoriesPending: false,
        merchantCategories: action.payload,
        originalMerchantCategories: action.payload,
        merchantCategoriesError: null,
      };

    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_ERROR:
      return {
        ...state,
        isMerchantCategoriesPending: false,
        merchantCategoriesError: action.payload,
      };

    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_BY_ID_PENDING:
      return {
        ...state,
        isMerchantCategoryPending: true,
      };

    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_BY_ID_SUCCESS:
      return {
        ...state,
        isMerchantCategoryPending: false,
        merchantCategory: action.payload,
        merchantCategoryError: null,
      };

    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_BY_ID_ERROR:
      return {
        ...state,
        isMerchantCategoryPending: false,
        merchantCategoryError: action.payload,
      };

    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_BY_CATEGORY_ID_PENDING:
      return {
        ...state,
        isMerchantsCategoryPending: true,
      };

    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_BY_CATEGORY_ID_SUCCESS:
      return {
        ...state,
        isMerchantsCategoryPending: false,
        merchantsCategory: action.payload,
        merchantsCategoryError: null,
      };

    case MerchantCategoryActionsTypes.GET.GET_MERCHANT_BY_CATEGORY_ID_ERROR:
      return {
        ...state,
        isMerchantsCategoryPending: false,
        merchantsCategoryError: action.payload,
      };

    case MerchantCategoryActionsTypes.SET.MERCHANT_CATEGORY_FILTER:
      const merchantCategories = []
      const originalMerchantCategories = [...state.originalMerchantCategories]
        .filter(merchantCategory => {
          if (action.payload?.id) {
            return merchantCategory.id === action.payload.id
          }

          return true
        })
      originalMerchantCategories.forEach(merchantCategory => {
        const newMerchantCategory = { ...merchantCategory }
        if (action.payload?.price) {
          if (newMerchantCategory?.merchants?.length) {
            newMerchantCategory.merchants = newMerchantCategory.merchants.filter(merchant => {
              if (merchant?.price) {
                const minPrice = action.payload.price[0]
                const maxPrice = action.payload.price[1]

                return minPrice <= merchant.price && merchant.price <= maxPrice
              }

              return false
            })
          }
        }

        merchantCategories.push(newMerchantCategory)
      })
      return {
        ...state,
        filter: action.payload,
        merchantCategories
      };

    default:
      return state;
  }
};

export default MerchantCategoryReducer;
