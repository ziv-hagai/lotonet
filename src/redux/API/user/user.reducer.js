import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  isUserPending: false,
  user: null,
  userError: null,

  isMoneyPending: false,
  moneyError: null,

  isSendMoneyPending: false,
  sendMoneyError: null,

  isSendGiftPending: false,
  sendGiftError: null,

  isRegisterPending: false,
  registerError: null,
};

const syncSession = () => {
  if (window?.B24Chat?.instance) {
    const instance = window?.B24Chat?.instance;
    instance.syncSession();
  }
};

const UserReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UserActionTypes.GET_USER_PENDING:
      return {
        ...state,
        isUserPending: true,
      };

    case UserActionTypes.GET_USER_SUCCESS:
      syncSession();
      return {
        ...state,
        isUserPending: false,
        user: action.payload,
        userError: null,
      };

    case UserActionTypes.GET_USER_ERROR:
      syncSession();
      return {
        ...state,
        user: null,
        isUserPending: false,
        userError: action.payload,
      };

    case UserActionTypes.POST_MONEY_PENDING:
      return {
        ...state,
        isMoneyPending: true,
      };

    case UserActionTypes.POST_MONEY_SUCCESS:
      return {
        ...state,
        isMoneyPending: false,
        user: action.payload,
        moneyError: null,
      };

    case UserActionTypes.POST_MONEY_ERROR:
      return {
        ...state,
        isMoneyPending: false,
        moneyError: action.payload,
      };

    case UserActionTypes.SEND_MONEY_PENDING:
      return {
        ...state,
        isSendMoneyPending: true,
      };

    case UserActionTypes.SEND_MONEY_SUCCESS:
      return {
        ...state,
        isSendMoneyPending: false,
        user: action.payload,
        sendMoneyError: null,
      };

    case UserActionTypes.SEND_MONEY_ERROR:
      return {
        ...state,
        isSendMoneyPending: false,
        sendMoneyError: action.payload,
      };

    case UserActionTypes.SEND_GIFT_PENDING:
      return {
        ...state,
        isSendGiftPending: true,
        sendGiftError: null,
      };

    case UserActionTypes.SEND_GIFT_SUCCESS:
      return {
        ...state,
        isSendGiftPending: false,
        sendGiftError: null,
      };

    case UserActionTypes.SEND_GIFT_ERROR:
      return {
        ...state,
        isSendGiftPending: false,
        sendGiftError: action.payload,
      };

    case UserActionTypes.USER_REGISTRATION_PENDING:
      return {
        ...state,
        isRegisterPending: true,
      };

    case UserActionTypes.USER_REGISTRATION_SUCCESS:
      syncSession();
      return {
        ...state,
        isRegisterPending: false,
        user: action.payload,
        registerError: null,
      };

    case UserActionTypes.USER_REGISTRATION_ERROR:
      return {
        ...state,
        isRegisterPending: false,
        registerError: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
