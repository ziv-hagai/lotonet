import { CouponActionTypes } from "./coupon.types";

const INITIAL_STATE = {
  isCouponsPending: false,
  coupons: [],
  couponsError: false,

  isCouponCheckPending: false,
  checkedCoupon: [],
  couponCheckError: false,

  isCouponCancelPending: false,
  cancelledCoupon: [],
  cancelCouponError: false,
};

const CouponReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case CouponActionTypes.GET.GET_COUPON_PENDING:
      return {
        ...state,
        isCouponsPending: true,
      };

    case CouponActionTypes.GET.GET_COUPON_SUCCESS:
      return {
        ...state,
        isCouponsPending: false,
        coupons: action.payload,
        couponsError: null,
      };

    case CouponActionTypes.GET.GET_COUPON_ERROR:
      return {
        ...state,
        isCouponsPending: false,
        couponsError: action.payload,
      };

    case CouponActionTypes.CHECK_COUPON_PENDING:
      return {
        ...state,
        isCouponCheckPending: true,
      };

    case CouponActionTypes.CHECK_COUPON_SUCCESS:
      return {
        ...state,
        isCouponCheckPending: false,
        checkedCoupon: action.payload,
        couponCheckError: null,
      };

    case CouponActionTypes.CHECK_COUPON_ERROR:
      return {
        ...state,
        isCouponCheckPending: false,
        couponCheckError: action.payload,
      };

    case CouponActionTypes.CANCEL_COUPON_PENDING:
      return {
        ...state,
        isCouponCancelPending: true,
      };

    case CouponActionTypes.CANCEL_COUPON_SUCCESS:
      return {
        ...state,
        isCouponCancelPending: false,
        cancelledCoupon: action.payload,
        cancelCouponError: null,
      };

    case CouponActionTypes.CANCEL_COUPON_ERROR:
      return {
        ...state,
        isCouponCancelPending: false,
        cancelCouponError: action.payload,
      };
    default:
      return state;
  }
};

export default CouponReducer;
