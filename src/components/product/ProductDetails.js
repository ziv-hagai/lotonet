import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../header/Header";
import { addToCart } from "../../redux/API/cart/cart.action";
import { getProductById } from "../../redux/API/product/product.action";
import QuantitySelector from "../quantitySelector";

import "../category/category.css";

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = location?.state;
  const product = useSelector((state) => state.product.product);
  const [numbersOfItems, setNumbersOfItems] = useState(1);
  const userId = useSelector((state) => state?.user?.user?.id);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]); //eslint-disable-line

  const handleChangeQuantity = (e) => setNumbersOfItems(e.target.value);

  const handleAddProduct = (product) => {
    if (!userId) return navigate("/login");
    dispatch(addToCart(product?.id, numbersOfItems, product?.bonusRuleId));
    toast.success("The product has been successfully added");
  };

  useEffect(() => {
    if (product && product?.type === "gift") {
      navigate("/gift", {
        state: { product },
      });
    }
  }, [product]); //eslint-disable-line

  return (
    <div>
      <Header />
      <div className="productDetails">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="productDetails-info">
                <div className="productDetails-heading">
                  <h5 className="productDetails-title">{product.title}</h5>
                  <h6 className="productDetails-price">
                    {product?.oldPrice && (
                      <>
                        <s>{product.oldPrice}₪</s>&nbsp;
                      </>
                    )}
                    <span>{product?.price || 0}₪</span>
                    {product?.credit && <> + {product.credit} e-credits</>}
                  </h6>
                </div>
                <div
                  onClick={() => {
                    navigate(`/vendor/${product.merchant.id}`, {
                      state: { id: product.merchant.id },
                    });
                  }}
                  className="productDetails-brand"
                >
                  {product?.merchant?.image && (
                    <span className="productDetails-brandImage">
                      <img
                        src={product.merchant.image}
                        alt=""
                        height={20}
                        width={20}
                        className="img-fluid"
                      />
                    </span>
                  )}
                  <p className="productDetails-brandName">
                    {product?.merchant?.title || t("No merchant")}
                  </p>
                </div>
                <div className="productDetails-content">
                  <h6 className="productDetails-contentTitle">
                    {t("description")}
                  </h6>
                  <p className="productDetails-contentText">
                    {product?.description || ""}
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
                    onClick={() => handleAddProduct(product)}
                  >
                    {t("addToCart")}
                  </Button>
                  {/*<Button className="buynow_btn">{t("BuyNow")}</Button>*/}
                </div>
                <ul className="productDetails-List">
                  {product?.sku && (
                    <li className="productDetails-ListItem">
                      <strong>{t("SKU")}: </strong>
                      {product.sku}
                    </li>
                  )}
                  <li className="productDetails-ListItem">
                    <strong>{t("categories")}: </strong>
                    {product?.categories?.reduce(
                      (p, c, i) => p + (i > 0 ? ", " : "") + c.title,
                      ""
                    ) || t("No categories")}
                  </li>
                  {/*<li className="productDetails-ListItem">*/}
                  {/*  <strong>{t("tags")}: </strong> {t("laptop")}*/}
                  {/*</li>*/}
                </ul>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="productDetails-img">
                {product?.discount && (
                  <div className="product-box__discount">
                    <span className="product-box__off">
                      {product.discountType ? "" : "-"}
                      {product.discount}
                      {product.discountType}
                    </span>
                  </div>
                )}
                <img
                  src={product?.image}
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
