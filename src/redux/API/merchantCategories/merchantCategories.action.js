import { MerchantCategoryActionsTypes } from "./merchantCategories.types";
import { axiosNoTokenInstance } from "../../axios.config";

export const getMerchantCategories = () => (dispatch) => {
  dispatch({
    type: MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_PENDING,
  });

  axiosNoTokenInstance
    .get("/merchant-category")
    .then((res) =>
      dispatch({
        type: MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_ERROR,
        payload: error.response.data,
      })
    );
};

export const getMerchantCategory = (categoryId) => (dispatch) => {
  dispatch({
    type: MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_BY_ID_PENDING,
  });

  axiosNoTokenInstance
    .get(`/merchant-category/${categoryId}`)
    .then((res) =>
      dispatch({
        type: MerchantCategoryActionsTypes.GET
          .GET_MERCHANT_CATEGORY_BY_ID_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: MerchantCategoryActionsTypes.GET.GET_MERCHANT_CATEGORY_BY_ID_ERROR,
        payload: error.response.data,
      })
    );
};

export const getMerchantsByCategoryId = (categoryId) => (dispatch) => {
  dispatch({
    type: MerchantCategoryActionsTypes.GET.GET_MERCHANT_BY_CATEGORY_ID_PENDING,
  });

  axiosNoTokenInstance
    .get(`/merchant-category/${categoryId}/merchants`)
    .then((res) =>
      dispatch({
        type: MerchantCategoryActionsTypes.GET
          .GET_MERCHANT_BY_CATEGORY_ID_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: MerchantCategoryActionsTypes.GET.GET_MERCHANT_BY_CATEGORY_ID_ERROR,
        payload: error.response.data,
      })
    );
};

export const setMerchantCategoryFilter = (filter) => (dispatch) => {
  dispatch({
    type: MerchantCategoryActionsTypes.SET.MERCHANT_CATEGORY_FILTER,
    payload: filter
  });
}
