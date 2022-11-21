import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";
import { Tab, Tabs } from "@material-ui/core";
// import Rating from "@mui/material/Rating";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
// import LinearProgress from "@mui/material/LinearProgress";

import Header from "../header/Header";
import {
  getMerchantById,
  getMerchantProducts,
} from "../../redux/API/merchant/merchant.action";

import Art from "../../assets/images/art.jpg";
import "../vendor/vendorsDetails.css";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};
const ratingTimes = 5; //eslint-disable-line

const Tabv = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${blue[400]};
  }

  &.${buttonUnstyledClasses.focusVisible} {
    color: #fff;
    outline: none;
    background-color: ${blue[200]};
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${blue[50]};
    color: ${blue[600]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;
const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: ${blue[500]};
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

export default function VendorsDetails() {
  // const [ratings, setRatings] = React.useState([0, 2, 3, 0, 0]);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [filterProducts, setFilterProducts] = useState([]);
  const { t } = useTranslation();
  const { id } = location?.state;
  const merchant = useSelector((state) => state.merchant.merchant);
  const products = useSelector((state) => state.merchant.merchantProducts);

  useEffect(() => {
    dispatch(getMerchantById(id));
    dispatch(getMerchantProducts(id));
  }, [id]); //eslint-disable-line

  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  //   height: 10,
  //   borderRadius: 5,
  // }));

  // const renderRatings = (item, index) => {
  //   //eslint-disable-line
  //   return (
  //     <div className="reviewList">
  //       <Rating
  //         value={item}
  //         onChange={(event, newValue) => {
  //           let a = ratings;
  //           a[index] = newValue;
  //           setRatings(JSON.parse(JSON.stringify(a)));
  //         }}
  //       ></Rating>
  //       <BorderLinearProgress
  //         id={index}
  //         variant="determinate"
  //         value={item * 20}
  //       />
  //     </div>
  //   );
  // };

  const handleChange = (event, newValue) => {
    if (newValue === "all") {
      setFilterProducts(products);
    } else {
      setFilterProducts(
        products.filter(
          (product) =>
            !!product?.categories?.find((category) => category.id === newValue)
        )
      );
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="vendorTemplate">
          <div
            className="vendorbanner"
            style={{
              backgroundImage: "url(" + Art + ")",
            }}
          >
            <div className="row align-items-center">
              <div className="col-lg-8">
                <div className="vendorbanner-brand">
                  <span className="vendorbanner-brandImg">
                    <img src={merchant?.image} className="img-fluid" alt="" />
                  </span>
                  <div className="vendorbanner-brandInfo">
                    {/*<h6 className="vendorbanner-brandTitle">*/}
                    {/*  {t("footLocker")}*/}
                    {/*</h6>*/}
                    <p className="vendorbanner-brandSubtitle">
                      {merchant?.title}
                    </p>
                  </div>
                </div>
              </div>
              {/*<div className="col-lg-4">*/}
              {/*  <Button className="blueBtn">{t("follow")}</Button>*/}
              {/*</div>*/}
            </div>
          </div>

          <div className="vendorContent">
            {merchant?.description && (
              <>
                <h6 className="vendorContent-title">{t("description")}</h6>
                <p className="vendorContent-text">{merchant.description}</p>
              </>
            )}
          </div>

          <div>
            <Tabs
              // defaultSelectedIndex={1}
              className="categoriesSliderTabs"
              onChange={handleChange}
            >
              <Tab value="all" label={t("all")}>
                All
              </Tab>
              {merchant?.productCategories?.length > 0 &&
                merchant.productCategories.map((category) => (
                  <Tab value={category.id} label={category.title}>
                    {category.title}
                  </Tab>
                ))}
            </Tabs>
          </div>
          <ul className="product-Module">
            {filterProducts.length > 0
              ? filterProducts.map((product) => (
                  <>
                    <li
                      className="product-Module__list isLink"
                      onClick={() => {
                        // if (catItem.imagename === "booking") {
                        //   navigate("/company", {
                        //     state: { isBookingApp: true },
                        //   });
                        // } else {
                        navigate(`/product/${product.id}`, {
                          state: { id: product.id },
                        });
                        // }
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
                          {product?.discount && (
                            <div className="product-box__discount">
                              <span className="product-box__off">
                                {product.discountType ? "" : "-"}
                                {product.discount}
                                {product.discountType}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="product-box__info">
                          <div className="product-box__infoTop">
                            <h6 className="product-box__brand">
                              {product.title}
                            </h6>
                            <span className="product-box__price">
                              {product?.oldPrice && (
                                <>
                                  <s>{product.oldPrice}₪</s>&nbsp;
                                </>
                              )}
                              {product?.price || 0}₪
                            </span>
                          </div>
                          {/*<h5 className="product-box__name">*/}
                          {/*  3 {t("boxSimple")}*/}
                          {/*</h5>*/}
                        </div>
                      </div>
                    </li>
                  </>
                ))
              : t("No products")}
          </ul>
          <TabsUnstyled
            defaultValue={
              location?.state?.vendors?.value
                ? location?.state?.vendors?.value
                : 0
            }
            className="centerTabs"
          >
            <TabsList>
              <Tabv>{t("topRated")}</Tabv>
              <Tabv>{t("allCollections")}</Tabv>
            </TabsList>
            <TabPanel value={0}>
              <ul className="product-Module">
                {products?.filter((product) => !!product.isTopRated).length > 0
                  ? products
                      .filter((product) => !!product.isTopRated)
                      .map((product, index) => (
                        <li className="product-Module__list" key={index}>
                          <div className="product-box">
                            <div
                              onClick={() => {
                                navigate(`/product/${product.id}`, {
                                  state: { id: product.id },
                                });
                              }}
                              className="product-box__img isLink"
                              style={{
                                backgroundImage: `url(${product.image})`,
                              }}
                            >
                              <div className="product-box__likeBtn">
                                <FavoriteBorderOutlinedIcon />
                              </div>
                              {/*<div className="product-box__discount">*/}
                              {/*  <span className="product-box__off">45%</span>*/}
                              {/*</div>*/}
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
                              {/*<h5 className="product-box__name">*/}
                              {/*  3 {t("boxSimple")}*/}
                              {/*</h5>*/}
                            </div>
                          </div>
                        </li>
                      ))
                  : t("No products")}
              </ul>
            </TabPanel>
            <TabPanel value={1}>
              <ul className="product-Module">
                {products?.filter((product) => !!product.isCollection).length >
                0
                  ? products
                      .filter((product) => !!product.isCollection)
                      .map((product, i) => (
                        <li className="product-Module__list isLink" key={i}>
                          <div
                            className="product-box"
                            onClick={() => {
                              navigate(`/product/${product.id}`, {
                                state: { id: product.id },
                              });
                            }}
                          >
                            <div
                              className="product-box__img"
                              style={{
                                backgroundImage: `url(${product.image})`,
                              }}
                            >
                              <div className="product-box__likeBtn">
                                <FavoriteBorderOutlinedIcon />
                              </div>
                              {/*<div className="product-box__discount">*/}
                              {/*  <span className="product-box__off">45%</span>*/}
                              {/*</div>*/}
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
                              {/*<h5 className="product-box__name">*/}
                              {/*  3 {t("boxSimple")}*/}
                              {/*</h5>*/}
                            </div>
                          </div>
                        </li>
                      ))
                  : t("No products")}
              </ul>
            </TabPanel>
          </TabsUnstyled>
        </div>
      </div>
    </>
  );
}
