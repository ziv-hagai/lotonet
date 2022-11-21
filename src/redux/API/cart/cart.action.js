import { CartActionTypes } from "./cart.types";
import { axiosInstance } from "../../axios.config";

const getCartCount = (cartItems) =>
  cartItems.reduce((p, c) => p + c.quantity, 0);

export const getCart = () => (dispatch) => {
  dispatch({ type: CartActionTypes.GET_CART_PENDING });

  axiosInstance
    .get(`/cart`)
    .then((res) =>
      dispatch({
        type: CartActionTypes.GET_CART_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: CartActionTypes.GET_CART_ERROR,
        payload: error.response.data,
      })
    );
};

export const addToCart =
  (productId, quantity = 1, bonusRuleId = null) =>
  (dispatch) => {
    dispatch({ type: CartActionTypes.GET_CART_PENDING });

    axiosInstance
      .post("/cart", {
        productId,
        quantity,
        bonusRuleId,
      })
      .then((res) => {
        dispatch({
          type: CartActionTypes.GET_CART_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CartActionTypes.GET_CART_COUNT_SUCCESS,
          payload: getCartCount(res.data),
        });
      })
      .catch((error) =>
        dispatch({
          type: CartActionTypes.GET_CART_ERROR,
          payload: error.response.data,
        })
      );
  };

export const updateCart =
  (productId, quantity = 1) =>
  (dispatch) => {
    dispatch({ type: CartActionTypes.GET_CART_PENDING });

    axiosInstance
      .put("/cart", {
        productId,
        quantity,
      })
      .then((res) => {
        dispatch({
          type: CartActionTypes.GET_CART_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: CartActionTypes.GET_CART_COUNT_SUCCESS,
          payload: getCartCount(res.data),
        });
      })
      .catch((error) =>
        dispatch({
          type: CartActionTypes.GET_CART_ERROR,
          payload: error.response.data,
        })
      );
  };

export const checkout = () => (dispatch) => {
  dispatch({ type: CartActionTypes.POST_CHECKOUT_PENDING });

  axiosInstance
    .post("/cart/checkout")
    .then((res) => {
      dispatch({
        type: CartActionTypes.POST_CHECKOUT_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CartActionTypes.GET_CART_COUNT_SUCCESS,
        payload: getCartCount(res.data),
      });
    })
    .catch((error) =>
      dispatch({
        type: CartActionTypes.POST_CHECKOUT_ERROR,
        payload: error.response.data,
      })
    );
};

export const removeItemFromCart = (productId) => (dispatch) => {
  dispatch({ type: CartActionTypes.GET_CART_PENDING });

  axiosInstance
    .delete(`/cart/${productId}`)
    .then((res) => {
      dispatch({
        type: CartActionTypes.GET_CART_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CartActionTypes.GET_CART_COUNT_SUCCESS,
        payload: getCartCount(res.data),
      });
    })
    .catch((error) =>
      dispatch({
        type: CartActionTypes.GET_CART_ERROR,
        payload: error.response.data,
      })
    );
};

export const clearCart = () => (dispatch) => {
  dispatch({ type: CartActionTypes.GET_CART_PENDING });

  axiosInstance
    .delete(`/cart`)
    .then((res) => {
      dispatch({
        type: CartActionTypes.GET_CART_SUCCESS,
        payload: res.data,
      });
      dispatch({
        type: CartActionTypes.GET_CART_COUNT_SUCCESS,
        payload: getCartCount(res.data),
      });
    })
    .catch((error) =>
      dispatch({
        type: CartActionTypes.GET_CART_ERROR,
        payload: error.response.data,
      })
    );
};
