import { ProductCategoryActionsTypes } from "./productCategories.types";
import { axiosNoTokenInstance } from "../../axios.config";

export const getProductCategories = () => (dispatch) => {
  dispatch({
    type: ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_PENDING,
  });

  axiosNoTokenInstance
    .get("/product-category")
    .then((res) =>
      dispatch({
        type: ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_ERROR,
        payload: error.response.data,
      })
    );
};

export const getProductCategory = (categoryId) => (dispatch) => {
  dispatch({
    type: ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_BY_ID_PENDING,
  });

  axiosNoTokenInstance
    .get(`/product-category/${categoryId}`)
    .then((res) =>
      dispatch({
        type: ProductCategoryActionsTypes.GET
          .GET_PRODUCT_CATEGORY_BY_ID_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: ProductCategoryActionsTypes.GET.GET_PRODUCT_CATEGORY_BY_ID_ERROR,
        payload: error.response.data,
      })
    );
};

export const getProductsByCategoryId = (categoryId) => (dispatch) => {
  dispatch({
    type: ProductCategoryActionsTypes.GET.GET_PRODUCTS_BY_CATEGORY_ID_PENDING,
  });

  axiosNoTokenInstance
    .get(`/product-category/${categoryId}/products`)
    .then((res) =>
      dispatch({
        type: ProductCategoryActionsTypes.GET
          .GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
        payload: res.data,
      })
    )
    .catch((error) =>
      dispatch({
        type: ProductCategoryActionsTypes.GET.GET_PRODUCTS_BY_CATEGORY_ID_ERROR,
        payload: error.response.data,
      })
    );
};

export const setProductCategoryFilter = (filter) => (dispatch) => {
  dispatch({
    type: ProductCategoryActionsTypes.SET.PRODUCT_CATEGORY_FILTER,
    payload: filter
  });
}
