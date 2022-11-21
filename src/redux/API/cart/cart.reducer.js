import { CartActionTypes } from "./cart.types";

const INITIAL_STATE = {
  isCartPending: false,
  cart: [],
  count: 0,
  cartError: null,

  isCheckoutPending: false,
  checkoutError: null,
};

const CartReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case CartActionTypes.GET_CART_COUNT_SUCCESS:
      return {
        ...state,
        count: action.payload,
      };

    case CartActionTypes.GET_CART_PENDING:
      return {
        ...state,
        isCartPending: true,
      };

    case CartActionTypes.GET_CART_SUCCESS:
      return {
        ...state,
        isCartPending: false,
        cart: action.payload,
        cartError: null,
      };

    case CartActionTypes.GET_CART_ERROR:
      return {
        ...state,
        isCartPending: false,
        cartError: action.payload,
      };

    case CartActionTypes.POST_CHECKOUT_PENDING:
      return {
        ...state,
        isCheckoutPending: true,
      };

    case CartActionTypes.POST_CHECKOUT_SUCCESS:
      return {
        ...state,
        isCheckoutPending: false,
        cart: action.payload,
        checkoutError: null,
      };

    case CartActionTypes.POST_CHECKOUT_ERROR:
      return {
        ...state,
        isCheckoutPending: false,
        checkoutError: action.payload,
      };

    default:
      return state;
  }
};

export default CartReducer;
