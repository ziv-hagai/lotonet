import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { getCoupons } from "../../../redux/actions-exporter";

const CouponList = () => {
  const dispatch = useDispatch();
  const coupons = useSelector((state) => state.coupon.coupons);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getCoupons());
  }, [dispatch]);

  const couponCodeToglle = (e) => {
    const code = e.target.nextElementSibling;
    if (code.style.display !== "block") {
      //   setCouponShow(true)
      code.style.display = "block";
      e.target.textContent = t("couponHide");
    } else {
      //   setCouponShow(false)
      code.style.display = "none";
      e.target.textContent = t("couponGet");
    }
  };

  return (
    <>
      {coupons
        .filter((coupon) => coupon.users?.length)
        .map((coupon, i) => {
          return (
            <div className="moneyBlock moneyBlock-coupon" key={i}>
              <div className="moneyBlock-heading">
                <h2 className="moneyBlock-price-title moneyBlock-title">
                  {t("coupon")}
                </h2>
                <h3 className="moneyBlock-price moneyBlock-coupon-price">
                  {coupon.discountValue +
                    (coupon.discountType === "percent" ? "%" : "₪")}
                </h3>
              </div>
              {/*<div className="moneyBlock-store">*/}
              {/*  <h2 className="moneyBlock-title">{el.storeTitle}</h2>*/}
              {/*  <img src={coupon.storeImg} className="moneyBlock-store-img" alt="" />*/}
              {/*</div>*/}
              {/*<div className="moneyBlock-product">*/}
              {/*  <h2 className="moneyBlock-title">{el.productName}</h2>*/}
              {/*  <img*/}
              {/*    src={el.productImg}*/}
              {/*    className="moneyBlock-product-img"*/}
              {/*    alt=""*/}
              {/*  />*/}
              {/*</div>*/}
              <div className="walletBtns">
                <Button onClick={couponCodeToglle} className="blueBtn">
                  {t("couponGet")}
                </Button>
                {/* {couponShow ? ( */}
                <h3 className="moneyBlock-price moneyBlock-code">
                  {coupon.couponCode}
                </h3>
                {/* ) : null} */}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default CouponList;
