import { AuthActionTypes } from "./auth.types";
import {
  axiosNoTokenInstance,
  axiosInstance,
  deleteCookie,
} from "@core/axios/axios.config";

export const logIn =
  ({ email, password }) =>
  (dispatch) => {
    dispatch({
      type: AuthActionTypes.LOG_IN_PENDING,
    });
    axiosNoTokenInstance
      .post("/api/v1/auth/token/login/", {
        email,
        password,
      })
      .then((response) =>
        dispatch({
          type: AuthActionTypes.LOG_IN,
          payload: response.data.auth_token,
        })
      )
      .catch((error) =>
        dispatch({
          type: AuthActionTypes.LOG_IN_ERROR,
          payload: { error, statusRequest: error.response.status },
        })
      );
  };

export const logOut = () => (dispatch) => {
  axiosInstance
    .post("/api/v1/auth/token/logout/", {})
    .then((data) => {
      dispatch({
        type: AuthActionTypes.LOG_OUT,
      });
      deleteCookie("Authorization");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
    .catch((error) => {
      console.error(error);
      if (error.response.status === 403) {
        deleteCookie("Authorization");
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
};

export const createUser = (email, password) => (dispatch) => {
  axiosInstance
    .post("/api/v1/auth/users/", {
      email,
      password,
    })
    .then((createdUser) => {
      dispatch({
        type: AuthActionTypes.CREATE_USER,
        payload: createdUser,
      });
    })
    .then(() => dispatch(logIn({ email, password })))
    .catch((error) => {
      if (error.response.data && error.response.data.email) {
        dispatch({
          type: AuthActionTypes.CREATE_USER_ERROR,
          payload: error.response.data,
        });
      }
      console.error(error);
    });
};

export const loginWithOauth = (access_token, provider) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.OAUTH.LOGIN_WITH_OAUTH_PENDING,
  });

  axiosNoTokenInstance
    .post(`/api/v1/oauth/`, {
      access_token,
      provider,
    })
    .then((loginSuccess) => {
      dispatch({
        type: AuthActionTypes.OAUTH.LOGIN_WITH_OAUTH_SUCCESS,
        payload: { login: loginSuccess.data, token: loginSuccess.data.token },
      });
    })
    .catch((err) => {
      dispatch({
        type: AuthActionTypes.OAUTH.LOGIN_WITH_OAUTH_ERROR,
        payload: err,
      });
    });
};

export const resetPassword = (email) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.RESET_PASSWORD_PENDING,
  });

  axiosInstance
    .post("/api/v1/auth/users/reset_password/", {
      email,
    })
    .then((response) => {
      dispatch({
        type: AuthActionTypes.RESET_PASSWORD_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      if (error.response.data && error.response.data.email) {
        dispatch({
          type: AuthActionTypes.RESET_PASSWORD_ERROR,
          payload: error.response.data,
        });
      }
      console.error(error);
    });
};

export const resetPasswordConfirm = (uid, token, password) => (dispatch) => {
  dispatch({
    type: AuthActionTypes.RESET_PASSWORD_PENDING,
  });

  axiosInstance
    .post("/api/v1/auth/users/reset_password_confirm/", {
      uid,
      token,
      new_password: password,
    })
    .then((response) => {
      dispatch({
        type: AuthActionTypes.RESET_PASSWORD_CONFIRM_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      if (error.response.data && error.response.data.email) {
        dispatch({
          type: AuthActionTypes.RESET_PASSWORD_CONFIRM_ERROR,
          payload: error.response.data,
        });
      }
      console.error(error);
    });
};
