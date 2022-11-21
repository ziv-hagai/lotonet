import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import PercentIcon from "@mui/icons-material/Percent";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, TextField } from "@mui/material";

import Header from "../header/Header";
import {
  getCart,
  removeItemFromCart,
  updateCart,
} from "../../redux/API/cart/cart.action";
import { CouponActionTypes } from "../../redux/API/coupon/coupon.types";
import {
  cancelCoupon,
  checkCoupon,
} from "../../redux/API/coupon/coupon.action";
import QuantitySelector from "../quantitySelector";

import "../cart/cart.css";

export default function Cart() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [numbersOfItems, setNumbersOfItems] = useState({});
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.user.user);
  const checkedCoupon = useSelector((state) => state.coupon.checkedCoupon);
  const cancelledCoupon = useSelector((state) => state.coupon.cancelledCoupon);
  const dispatch = useDispatch();
  const [visibilityPromocodeInput, setVisibilityPromocodeInput] =
    useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeActvated, setPromoCodeActvated] = useState(false);

  const getTotal = () => cart?.reduce((c, p) => c + p.total, 0);
  const getDiscountTotal = () =>
    cart?.reduce((c, p) => c + p?.discountTotal || 0, 0).toFixed(1);

  const handleUsePromocode = () =>
    setVisibilityPromocodeInput(!visibilityPromocodeInput);
  const handlePromoCodeChange = (e) => setPromoCode(e.target.value);
  const handleSubmitPromocode = () => {
    if (!promoCodeActvated) return dispatch(checkCoupon(promoCode));
    return dispatch(cancelCoupon());
  };

  const handleChangeQuantity = (e, productId) => {
    let result = { ...numbersOfItems };

    if (result[productId] !== e.target.value || !result[productId]) {
      dispatch(updateCart(productId, e.target.value));
    }

    result[productId] = e.target.value;
    setNumbersOfItems(result);
  };

  useEffect(() => {
    if (cart?.length && cart[0]?.couponCode) {
      setPromoCodeActvated(true);
      setVisibilityPromocodeInput(true);
      setPromoCode(cart[0]?.couponCode);
    } else {
      dispatch({ type: CouponActionTypes.CANCEL_COUPON_SUCCESS });
    }
  }, [cart]); //eslint-disable-line

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]); // eslint-disable-line

  useEffect(() => {
    if (!user?.id) return navigate("/login");
    // if (!user?.result?.id) {
    //   if (window?.B24Chat?.instance) {
    //     const instance = window?.B24Chat?.instance;
    //     instance.login();
    //   } else {
    //     return navigate("/");
    //   }
    // }
  }, [user, navigate]);

  useEffect(() => {
    if (!checkedCoupon.id) {
      if (promoCode) return toast.error("Invalid promocode");
      return;
    }
    setPromoCodeActvated(true);
    dispatch(getCart());
    toast.success("Promo code has activated!");
  }, [checkedCoupon]); //eslint-disable-line

  useEffect(() => {
    if (!cancelledCoupon) return;
    setPromoCodeActvated(false);
    dispatch(getCart());
    return setPromoCode("");
  }, [cancelledCoupon]); //eslint-disable-line

  return (
    <>
      <Header />
      <div className="container">
        <div className="cartTemplate">
          <div className="templateHeading">
            <span className="backIcon">
              <ArrowBackIcon
                onClick={() => {
                  navigate("/");
                }}
              />
            </span>
            <h1 className="templateTitle">{t("cart")}</h1>
          </div>
          <ul>
            {cart.length > 0
              ? cart.map((item, i) => {
                  return (
                    <li className="cartProduct-Module__list" key={item.id}>
                      <div
                        className="cartProduct-box__img"
                        style={{
                          backgroundImage: `url(${item.product.image})`,
                        }}
                      ></div>

                      <div className="cartProduct-box">
                        <h6 className="cartProduct-box__brand">
                          {item.product.title}
                        </h6>
                        <div className="cartProduct-box__noImgNoTitle">
                          <div className="cartProduct-box__info">
                            <h5 className="cartProduct-box__name">
                              {item.product.description}
                            </h5>
                            {item.bonusRule && (
                              <div className="cartProduct-box__rule">
                                {t("Discount rule")}: {item.bonusRule.title}
                              </div>
                            )}
                            {!promoCodeActvated ? (
                              <span
                                className="cartProduct-box__price"
                                style={{
                                  justifyContent: "space-between",
                                  alignItems: "end",
                                }}
                              >
                                <div className="cartProduct-box__price">
                                  {/* {item?.price || 0}$ */}
                                  {item.quantity > 0 && item.total + "₪"}
                                  {item.product.credit
                                    ? " / " +
                                      item?.product?.credit?.toFixed(1) *
                                        item.quantity +
                                      " e-credit"
                                    : ""}
                                </div>
                                <QuantitySelector
                                  onChange={(e) =>
                                    handleChangeQuantity(e, item.productId)
                                  }
                                  minValue={1}
                                  value={
                                    numbersOfItems[item.productId] ||
                                    item.quantity
                                  }
                                />
                              </span>
                            ) : (
                              <>
                                <div
                                  className="cartProduct-box__price"
                                  style={{ padding: "10px 0" }}
                                >
                                  {/* {item.discountPrice}₪ */}
                                  {item?.discountPrice && (
                                    <>
                                      {item.quantity > 0 &&
                                        +item.discountTotal.toFixed(1) + "₪"}
                                      <div className="cartProduct-box__price__discount">
                                        {/* {item?.price || 0}₪ */}
                                        {item.quantity > 0 &&
                                          +item.total.toFixed(1) + "₪"}
                                        {item.product.credit
                                          ? " / " +
                                            item?.product?.credit?.toFixed(1) +
                                            " e-credit"
                                          : ""}
                                      </div>
                                    </>
                                  )}
                                </div>
                                <QuantitySelector
                                  onChange={(e) =>
                                    handleChangeQuantity(e, item.productId)
                                  }
                                  minValue={1}
                                  value={
                                    numbersOfItems[item.productId] ||
                                    item.quantity
                                  }
                                />
                              </>
                            )}
                          </div>
                          <div className="cartProduct-rightBlock">
                            <div className="cartProduct-box__brandBox">
                              {item.product?.merchant?.image && (
                                <span className="cartProduct-brandImage">
                                  <img
                                    src={item.product.merchant.image}
                                    alt=""
                                    height={20}
                                    width={20}
                                    className="img-fluid"
                                  />
                                </span>
                              )}
                              {/* <p className="cartProduct-brandName">
                              {item.product?.merchant?.title || t("No merchant")}
                            </p> */}
                            </div>
                            <p className="cartProduct-brandName">
                              {item.product?.merchant?.title ||
                                t("No merchant")}
                            </p>
                            <div
                              className="removeBtn"
                              onClick={() => {
                                dispatch(removeItemFromCart(item.product.id));
                                toast.success(
                                  "The product has been successfully removed"
                                );
                              }}
                            >
                              <DeleteIcon />
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <QuantitySelector
                        onChange={(e) =>
                          handleChangeQuantity(e, item.productId)
                        }
                        minValue={1}
                        value={numbersOfItems[item.productId] || item.quantity}
                      /> */}
                    </li>
                  );
                })
              : t("Cart empty")}
          </ul>
          {cart.length > 0 && (
            <div className="summaryCard">
              <div className="summaryCard-tab">
                <div
                  className="summaryCard-tabBtn isLink"
                  onClick={() => setShow(!show)}
                >
                  {t("orderSummary")}
                  <KeyboardArrowDownIcon
                    className={show ? "arrow-rotate-top" : ""}
                  />
                </div>
              </div>
              {show ? (
                !promoCodeActvated ? (
                  <>
                    <ul className="summaryCard-List">
                      <li className="summaryCard-ListItems">
                        <p>{t("subtotal")}</p>
                        <div>
                          <span>{getTotal()}₪</span>
                        </div>
                      </li>
                      {/*<li className="summaryCard-ListItems">*/}
                      {/*  <p>{t("additionalProducts")}</p>*/}
                      {/*  <span>$10</span>*/}
                      {/*</li>*/}
                    </ul>
                    <div className="totalList">
                      <span>{t("total")}</span>
                      <div>
                        <span>{getTotal()}₪</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ul className="summaryCard-List">
                      <li className="summaryCard-ListItems">
                        <p>{t("subtotal")}</p>
                        <div>
                          <span style={{ marginRight: "10px" }}>
                            {getDiscountTotal()}₪
                          </span>
                          <span className="cartProduct-box__price__discount">
                            {getTotal()}₪
                          </span>
                        </div>
                      </li>
                      {/*<li className="summaryCard-ListItems">*/}
                      {/*  <p>{t("additionalProducts")}</p>*/}
                      {/*  <span>$10</span>*/}
                      {/*</li>*/}
                    </ul>
                    <div className="totalList">
                      <span>{t("total")}</span>
                      <div>
                        <span style={{ marginRight: "10px" }}>
                          {getDiscountTotal()}₪
                        </span>
                        <span className="cartProduct-box__price__discount">
                          {getTotal()}₪
                        </span>
                      </div>
                    </div>
                  </>
                )
              ) : null}
              <div className="cartBtns">
                <Box className="outline-box">
                  {!visibilityPromocodeInput ? (
                    <Button
                      variant="outlined"
                      startIcon={<PercentIcon />}
                      endIcon={<NavigateNextIcon />}
                      onClick={handleUsePromocode}
                    >
                      {t("usePromoCode")}
                    </Button>
                  ) : (
                    <>
                      <TextField
                        label={t("Code")}
                        variant="standard"
                        className="promocode-input"
                        value={promoCode}
                        onChange={handlePromoCodeChange}
                        disabled={promoCodeActvated}
                      />
                      <Button onClick={handleSubmitPromocode}>
                        {promoCodeActvated ? "x" : t("usePromoCode")}
                      </Button>
                    </>
                  )}
                </Box>
                <Button
                  variant="outlined"
                  onClick={() => {
                    navigate("/checkout");
                  }}
                >
                  {t("checkout")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
