import { ProductsActionTypes } from "./product.types";
import { axiosNoTokenInstance } from "../../axios.config";

export const getProducts = () => (dispatch) => {
  dispatch({ type: ProductsActionTypes.GET.GET_PRODUCT_PENDING });

  axiosNoTokenInstance
    .get("/product")
    .then((res) =>
      dispatch({
        type: ProductsActionTypes.GET.GET_PRODUCT_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: ProductsActionTypes.GET.GET_PRODUCT_ERROR,
        payload: error.response.data,
      })
    );
};

export const getProductById = (productId) => (dispatch) => {
  dispatch({ type: ProductsActionTypes.GET.GET_PRODUCT_BY_ID_PENDING });

  axiosNoTokenInstance
    .get(`/product/${productId}`)
    .then((res) =>
      dispatch({
        type: ProductsActionTypes.GET.GET_PRODUCT_BY_ID_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: ProductsActionTypes.GET.GET_PRODUCT_BY_ID_ERROR,
        payload: error.response.data,
      })
    );
};

export const setProductFilter = (filter) => (dispatch) => {
  dispatch({
    type: ProductsActionTypes.SET.PRODUCT_FILTER,
    payload: filter
  });
}
