import "./Sales.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";

import { getProductCategories } from "../../redux/actions-exporter";

export default function SalesList({ isNotScrolling }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );

  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]); // eslint-disable-line

  useEffect(() => {
    if (categories.length) {
      const prepareProduct = categories.reduce(
        (previous, current) => [
          ...previous,
          ...current.products.map((product) => ({
            ...product,
            categoryId: current.id,
            categoryName: current.title,
          })),
        ],
        []
      );
      setProducts(prepareProduct);
      setFilterProducts(prepareProduct);
    }
  }, [categories]);

  const handleChange = (event, newValue) => {
    if (newValue === "all") {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter((product) => product.categoryId === newValue)
      );
    }
  };

  return (
    <>
      <Tabs
        defaultSelectedIndex={0}
        className="categoriesSliderTabs"
        onChange={handleChange}
      >
        <Tab value="all" label={t("all")}>
          All
        </Tab>
        {categories.length > 0 &&
          categories.map((category) => (
            <Tab value={category.id} label={category.title}>
              {category.title}
            </Tab>
          ))}
      </Tabs>

      <div className="product-block">
        {isNotScrolling ? (
          <ul className="product-Module">
            {filterProducts.length > 0
              ? filterProducts.map((product) => (
                  <>
                    <li
                      className="product-Module__list isLink"
                      onClick={() => {
                        navigate(`/product/${product.id}`, {
                          state: { id: product.id },
                        });
                      }}
                    >
                      <div className="product-box">
                        <div
                          className="product-box__img"
                          style={{ backgroundImage: `url(${product.image})` }}
                        >
                          <div className="product-box__likeBtn">
                            <FavoriteBorderOutlinedIcon />
                          </div>
                          <div className="product-box__discount">
                            <span className="product-box__off">45%</span>
                          </div>
                          <div className="product-box__timer">
                            <span className="product-box__timer__text">
                              03:45
                            </span>
                          </div>
                        </div>
                        <div className="product-box__info">
                          <div className="product-box__infoTop">
                            <h6 className="product-box__brand">
                              {product.title}
                            </h6>
                            <span className="product-box__price">
                              {product?.price || 0}₪
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </>
                ))
              : t("No products")}
          </ul>
        ) : (
          <ScrollingCarousel>
            <ul className="productList">
              {filterProducts.length > 0
                ? filterProducts.map((product) => (
                    <>
                      <li
                        className="product-Module__list isLink"
                        onClick={() => {
                          navigate(`/product/${product.id}`, {
                            state: { id: product.id },
                          });
                        }}
                      >
                        <div className="product-box">
                          <div
                            className="product-box__img"
                            style={{ backgroundImage: `url(${product.image})` }}
                          >
                            <div className="product-box__likeBtn">
                              <FavoriteBorderOutlinedIcon />
                            </div>
                            <div className="product-box__discount">
                              <span className="product-box__off">45%</span>
                            </div>
                            <div className="product-box__timer">
                              <span className="product-box__timer__text">
                                03:45
                              </span>
                            </div>
                          </div>
                          <div className="product-box__info">
                            <div className="product-box__infoTop">
                              <h6 className="product-box__brand">
                                {product.title}
                              </h6>
                              <span className="product-box__price">
                                {product?.price || 0}₪
                              </span>
                            </div>
                          </div>
                        </div>
                      </li>
                    </>
                  ))
                : t("No products")}
            </ul>
          </ScrollingCarousel>
        )}
      </div>
    </>
  );
}
