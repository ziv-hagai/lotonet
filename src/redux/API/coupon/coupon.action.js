import { CouponActionTypes } from "./coupon.types";
import { axiosInstance } from "../../axios.config";

export const getCoupons = () => (dispatch) => {
  dispatch({ type: CouponActionTypes.GET.GET_COUPON_PENDING });

  axiosInstance
    .get("/coupon")
    .then((res) =>
      dispatch({
        type: CouponActionTypes.GET.GET_COUPON_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: CouponActionTypes.GET.GET_COUPON_ERROR,
        payload: error.response.data,
      })
    );
};

export const checkCoupon = (coupon) => (dispatch) => {
  dispatch({ type: CouponActionTypes.CHECK_COUPON_PENDING });

  axiosInstance
    .post(`/coupon/${coupon}`, {
      code: coupon,
    })
    .then((res) =>
      dispatch({
        type: CouponActionTypes.CHECK_COUPON_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: CouponActionTypes.CHECK_COUPON_ERROR,
        payload: error.response.data,
      })
    );
};

export const cancelCoupon = () => (dispatch) => {
  dispatch({ type: CouponActionTypes.CANCEL_COUPON_PENDING });

  axiosInstance
    .delete(`/coupon`)
    .then((res) =>
      dispatch({
        type: CouponActionTypes.CANCEL_COUPON_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: CouponActionTypes.CANCEL_COUPON_ERROR,
        payload: error.response.data,
      })
    );
};
