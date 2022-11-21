import { AuthActionTypes } from "./auth.types";

const INITIAL_STATE = {
  token: "",
  createdUser: {},
  createUserError: "",
  logInPending: false,
  loggedIn: false,
  logInError: {},
  logInErrorStatus: "",

  isLoginWithOauthPending: false,
  loginWithOauth: {},
  loginWithOauthError: {},

  resetPasswordPending: false,
  resetPasswordResult: false,
  resetPasswordError: false,

  resetPasswordConfirmResult: false,
  resetPasswordConfirmError: false,
};

const AuthReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case AuthActionTypes.CHECK_TOKEN:
      return {
        ...state,
        loggedIn: true,
      };

    case AuthActionTypes.LOG_IN_PENDING:
      return {
        ...state,
        logInPending: true,
      };

    case AuthActionTypes.LOG_IN:
      return {
        ...state,
        token: action.payload,
        loggedIn: true,
        logInPending: false,
      };

    case AuthActionTypes.LOG_OUT:
      return {
        ...state,
        token: "",
        loggedIn: false,
      };

    case AuthActionTypes.CREATE_USER:
      return {
        ...state,
        createdUser: action.payload,
      };

    case AuthActionTypes.CREATE_USER_ERROR:
      return {
        ...state,
        createUserError: action.payload,
      };

    case AuthActionTypes.LOG_IN_ERROR:
      return {
        ...state,
        logInError: action.payload,
        logInErrorStatus: action.payload.statusRequest,
        logInPending: false,
      };

    case AuthActionTypes.OAUTH.LOGIN_WITH_OAUTH_PENDING:
      return {
        ...state,
        isLoginWithOauthPending: true,
      };

    case AuthActionTypes.OAUTH.LOGIN_WITH_OAUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        loginWithOauth: action.payload,
        isLoginWithOauthPending: false,
      };

    case AuthActionTypes.OAUTH.LOGIN_WITH_OAUTH_ERROR:
      return {
        ...state,
        loginWithOauthError: action.payload,
        isLoginWithOauthPending: false,
      };

    case AuthActionTypes.RESET_PASSWORD_PENDING:
      return {
        ...state,
        resetPasswordPending: true,
      };

    case AuthActionTypes.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordResult: true,
        resetPasswordPending: false,
      };

    case AuthActionTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPasswordError: true,
        resetPasswordPending: false,
      };

    case AuthActionTypes.RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        resetPasswordConfirmResult: true,
        resetPasswordPending: false,
      };

    case AuthActionTypes.RESET_PASSWORD_CONFIRM_ERROR:
      return {
        ...state,
        resetPasswordConfirmError: true,
        resetPasswordPending: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
