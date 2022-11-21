import { combineReducers } from "redux";

import UserReducer from "./API/user/user.reducer";
import MerchantReducer from "./API/merchant/merchant.reducer";
import MerchantCategoryReducer from "./API/merchantCategories/merchantCategories.reducer";
import AuthReducer from "./store/auth/auth.reducer";
import TabbingReducer from "./API/tabbing/tabbing.reducer";
import ChatReducer from "./API/chat/chat.reducer";
import ProductReducer from "./API/product/product.reducer";
import ProductCategoryReducer from "./API/productCategories/productCategories.reducer";
import CartReducer from "./API/cart/cart.reducer";
import CouponReducer from "./API/coupon/coupon.reducer";

export default combineReducers({
  user: UserReducer,
  authReducer: AuthReducer,
  merchant: MerchantReducer,
  merchantCategories: MerchantCategoryReducer,
  tabbing: TabbingReducer,
  chat: ChatReducer,
  product: ProductReducer,
  productCategories: ProductCategoryReducer,
  cart: CartReducer,
  coupon: CouponReducer,
});
