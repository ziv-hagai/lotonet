import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../header/Header";
import QuantitySelector from "../quantitySelector";
import { addToCart } from "../../redux/API/cart/cart.action";
import { getProductCategory } from "../../redux/API/productCategories/productCategories.action";

import "../category/category.css";
import Footlocker from "../../assets/images/footlocker.png";

export default function CategoryDetails() {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = location?.state;
  const category = useSelector(
    (state) => state.productCategories.productCategory
  );
  const [numbersOfItems, setNumbersOfItems] = useState(1);

  useEffect(() => {
    dispatch(getProductCategory(id));
  }, [id]); //eslint-disable-line

  const handleChangeQuantity = (e) => setNumbersOfItems(e.target.value);

  return (
    <div>
      <Header />
      <div className="productDetails">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="productDetails-info">
                <div className="productDetails-heading">
                  <h5 className="productDetails-title">{category?.title}</h5>
                  {/*<h6 className="productDetails-price">*/}
                  {/*  <span>{category?.price || 0}$</span>*/}
                  {/*  {category?.credit && (*/}
                  {/*    <> / {category.credit} e-credits</>*/}
                  {/*  )}*/}
                  {/*</h6>*/}
                </div>
                <div className="productDetails-brand">
                  <span className="productDetails-brandImage">
                    <img
                      src={Footlocker}
                      alt=""
                      height={20}
                      width={20}
                      className="img-fluid"
                    />
                  </span>
                  <p className="productDetails-brandName">{t("footlocker")}</p>
                </div>
                <div className="productDetails-content">
                  <h6 className="productDetails-contentTitle">
                    {t("description")}
                  </h6>
                  <p className="productDetails-contentText">
                    {category?.description || ""}
                  </p>
                </div>
                <QuantitySelector
                  onChange={handleChangeQuantity}
                  minValue="1"
                  value={numbersOfItems}
                />
                <div className="productDetails-btns">
                  <Button
                    className="addcart_btn"
                    onClick={() => {
                      dispatch(addToCart(category?.id));
                      toast.success("The product has been successfully added");
                    }}
                  >
                    {t("addToCart")}
                  </Button>
                  {/*<Button className="buynow_btn">{t("BuyNow")}</Button>*/}
                </div>
                <ul className="productDetails-List">
                  <li className="productDetails-ListItem">
                    <strong>{t("categories")} : </strong>{" "}
                    {category?.categoryName || ""}
                  </li>
                  {/*<li className="productDetails-ListItem">*/}
                  {/*  <strong>{t("tags")} : </strong> {t("laptop")}*/}
                  {/*</li>*/}
                </ul>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="productDetails-img">
                <img
                  src={category?.image}
                  alt=""
                  height={50}
                  width={50}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
