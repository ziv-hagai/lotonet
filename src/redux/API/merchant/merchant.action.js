import { MerchantsActionTypes } from "./merchant.types";
import { axiosNoTokenInstance } from "../../axios.config";

export const getMerchants = () => (dispatch) => {
  dispatch({ type: MerchantsActionTypes.GET.GET_MERCHANT_PENDING });

  axiosNoTokenInstance
    .get("/merchant")
    .then((res) =>
      dispatch({
        type: MerchantsActionTypes.GET.GET_MERCHANT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: MerchantsActionTypes.GET.GET_MERCHANT_ERROR,
        payload: error.response.data,
      })
    );
};

export const getMerchantById = (merchantId) => (dispatch) => {
  dispatch({ type: MerchantsActionTypes.GET.GET_MERCHANT_BY_ID_PENDING });

  axiosNoTokenInstance
    .get(`/merchant/${merchantId}`)
    .then((res) =>
      dispatch({
        type: MerchantsActionTypes.GET.GET_MERCHANT_BY_ID_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: MerchantsActionTypes.GET.GET_MERCHANT_BY_ID_ERROR,
        payload: error.response.data,
      })
    );
};

export const getMerchantProducts = (merchantId) => (dispatch) => {
  dispatch({ type: MerchantsActionTypes.GET.GET_MERCHANT_PRODUCTS_PENDING });

  axiosNoTokenInstance
    .get(`/merchant/${merchantId}/products`)
    .then((res) =>
      dispatch({
        type: MerchantsActionTypes.GET.GET_MERCHANT_PRODUCTS_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: MerchantsActionTypes.GET.GET_MERCHANT_PRODUCTS_ERROR,
        payload: error.response.data,
      })
    );
};
