import { toast } from "react-toastify";

import { UserActionTypes } from "./user.types";
import { CartActionTypes } from "../cart/cart.types";
import { axiosInstance } from "../../axios.config";

export const getUser = () => (dispatch) => {
  dispatch({ type: UserActionTypes.GET_USER_PENDING });

  axiosInstance
    .get(`/user/me`)
    .then((res) => {
      dispatch({
        type: UserActionTypes.GET_USER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CartActionTypes.GET_CART_COUNT_SUCCESS,
        payload: res.data.cartCount,
      });
    })
    .catch((error) => {
      dispatch({
        type: UserActionTypes.GET_USER_ERROR,
        payload: error.response.data,
      });
      dispatch({
        type: CartActionTypes.GET_CART_COUNT_SUCCESS,
        payload: 0,
      });
    });
};

export const login = (data, successCallback) => (dispatch) => {
  dispatch({ type: UserActionTypes.GET_USER_PENDING });

  axiosInstance
    .post(`/user/login`, data)
    .then((res) => {
      dispatch({
        type: UserActionTypes.GET_USER_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CartActionTypes.GET_CART_COUNT_SUCCESS,
        payload: res.data.cartCount,
      });

      if (typeof successCallback === "function") {
        successCallback();
      }
    })
    .catch((error) => {
      dispatch({
        type: UserActionTypes.GET_USER_ERROR,
        payload: error.response.data,
      });

      toast.error(error.response.data.message);
    });
};

export const logout = (successCallback) => (dispatch) => {
  dispatch({ type: UserActionTypes.GET_USER_PENDING });

  axiosInstance
    .delete(`/user/logout`)
    .then((res) => {
      dispatch({
        type: UserActionTypes.GET_USER_SUCCESS,
        payload: null,
      });
      dispatch({
        type: CartActionTypes.GET_CART_COUNT_SUCCESS,
        payload: 0,
      });

      if (typeof successCallback === "function") {
        successCallback();
      }
    })
    .catch((error) => {
      dispatch({
        type: UserActionTypes.GET_USER_ERROR,
        payload: error.response.data,
      });
      toast.error(error.response.data);
    });
};

export const addMoney =
  (money = 0, credit = false) =>
  (dispatch) => {
    dispatch({ type: UserActionTypes.POST_MONEY_PENDING });

    axiosInstance
      .post(`/user/money`, {
        credit,
        money,
      })
      .then((res) =>
        dispatch({
          type: UserActionTypes.POST_MONEY_SUCCESS,
          payload: res.data,
        })
      )
      .catch((error) => {
        dispatch({
          type: UserActionTypes.POST_MONEY_ERROR,
          payload: error.response.data,
        });

        toast.error(error?.response?.data?.message);
      });
  };

export const sendMoney =
  (data, successCallback, errorCallback) => (dispatch) => {
    dispatch({ type: UserActionTypes.SEND_MONEY_PENDING });

    axiosInstance
      .post(`/user/money/send`, data)
      .then((res) => {
        dispatch({
          type: UserActionTypes.SEND_MONEY_SUCCESS,
          payload: res.data,
        });

        if (typeof successCallback === "function") {
          successCallback();
        }
      })
      .catch((error) => {
        dispatch({
          type: UserActionTypes.SEND_MONEY_ERROR,
          payload: error.response.data,
        });

        if (typeof errorCallback === "function") {
          errorCallback();
        }
      });
  };

export const sendGift =
  (data, successCallback, errorCallback) => (dispatch) => {
    dispatch({ type: UserActionTypes.SEND_GIFT_PENDING });

    axiosInstance
      .post(`/user/gift/send`, data)
      .then((res) => {
        dispatch({ type: UserActionTypes.SEND_GIFT_SUCCESS });

        if (typeof successCallback === "function") {
          successCallback();
        }
      })
      .catch((error) => {
        dispatch({
          type: UserActionTypes.SEND_GIFT_ERROR,
          payload: error,
        });

        if (typeof errorCallback === "function") {
          errorCallback();
        }
      });
  };

export const register =
  (data, successCallback, errorCallback) => (dispatch) => {
    dispatch({ type: UserActionTypes.USER_REGISTRATION_PENDING });

    axiosInstance
      .post(`/user/registration`, data)
      .then((res) => {
        dispatch({
          type: UserActionTypes.USER_REGISTRATION_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CartActionTypes.GET_CART_COUNT_SUCCESS,
          payload: res.data.cartCount,
        });

        if (typeof successCallback === "function") {
          successCallback();
        }
      })
      .catch((error) => {
        dispatch({
          type: UserActionTypes.USER_REGISTRATION_ERROR,
          payload: error.response.data,
        });

        if (typeof errorCallback === "function") {
          errorCallback();
        }
      });
  };
