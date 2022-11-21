import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

// import ChatBot from "../chat/ChatBot";
import Header from "../header/Header";
import OnlyCategoryList from "../category/OnlyCategoryList";

import {
  getMerchants,
  getProductCategories,
} from "../../redux/actions-exporter";
import CouponsList from "../couponsList";
import VendorList from "./VendorList";

import Art from "../../assets/images/art.jpg";
import "./dashboard.css";
import Pagination from "./pagination";
import OtherCategories from "./otherCategories/OtherCategories";

//icons
import { MdLocalLaundryService } from "react-icons/md";
import { GiConverseShoe } from "react-icons/gi";
import { GiRunningShoe } from "react-icons/gi";
import { GiLargeDress } from "react-icons/gi";
import { GiClothes } from "react-icons/gi";
import { GiKitchenKnives } from "react-icons/gi";
import { RiShirtFill } from "react-icons/ri";
import { GiFlipFlops } from "react-icons/gi";
import { MdLocalPharmacy } from "react-icons/md";
import { ImBooks } from "react-icons/im";
import { GiSoccerBall } from "react-icons/gi";
import { GiHighHeel } from "react-icons/gi";
import { MdCleanHands } from "react-icons/md";
import { GiLipstick } from "react-icons/gi";
import { MdFastfood } from "react-icons/md";
import { GiSteeltoeBoots } from "react-icons/gi";
import { MdToys } from "react-icons/md";
import { BsWatch } from "react-icons/bs";

const screenWidth = window.innerWidth;
let makeProductsPerPage = 0;
if (screenWidth > 991) {
  makeProductsPerPage = 12;
} else if (screenWidth > 767) {
  makeProductsPerPage = 8;
} else if (screenWidth > 500) {
  makeProductsPerPage = 6;
} else {
  makeProductsPerPage = 10;
}

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [BalanceTitleFont, setBalanceTitleFont] = useState('10vw');

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(makeProductsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentFilterProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (e) => {
    setCurrentPage(e.target.textContent);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  // const merchants = useSelector((state) => state.merchant.merchants);
  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );

  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    dispatch(getMerchants());
    dispatch(getProductCategories());
  }, [dispatch]); // eslint-disable-line

  const handleFavChange = () => {
    // let temp = [{ name: "test" }];
    // dispatch({
    //   type: ADD_TO_CART,
    //   payload: temp,
    // });
  };

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
    setCurrentPage(1);
    if (newValue === "all") {
      setFilterProducts(products);
    } else {
      let productByCategoryById = [];
      categories.map((category) => {
        if (category.parent === newValue) {
          category.products.map((product) => {
            productByCategoryById.push(product);
            return product;
          });
        }
        return category;
      });
      setFilterProducts(productByCategoryById);
    }
  };

  const otherCategoriesArr = [
    {
      title: t("Appliances"),
      icon: <MdLocalLaundryService />,
      id: 17,
    },
    {
      title: t("Kids shoes"),
      icon: <GiConverseShoe />,
      id: 11,
    },
    {
      title: t("Mens shoes"),
      icon: <GiRunningShoe />,
      id: 12,
    },
    {
      title: t("Girls dresses"),
      icon: <GiLargeDress />,
      id: 10,
    },
    {
      title: t("kids clothes"),
      icon: <GiClothes />,
      id: 18,
    },
    {
      title: t("Cookware"),
      icon: <GiKitchenKnives />,
      id: 2,
    },
    {
      title: t("Mens clothes"),
      icon: <RiShirtFill />,
      id: 15,
    },
    {
      title: t("Flip flops"),
      icon: <GiFlipFlops />,
      id: 13,
    },
    {
      title: t("pharm"),
      icon: <MdLocalPharmacy />,
      id: 5,
    },
    {
      title: t("books"),
      icon: <ImBooks />,
      id: 8,
    },
    {
      title: t("sport"),
      icon: <GiSoccerBall />,
      id: 6,
    },
    {
      title: t("women shoes"),
      icon: <GiHighHeel />,
      id: 16,
    },
    {
      title: t("hygiene"),
      icon: <MdCleanHands />,
      id: 4,
    },
    {
      title: t("care"),
      icon: <GiLipstick />,
      id: 1,
    },
    {
      title: t("food"),
      icon: <MdFastfood />,
      id: 3,
    },
    {
      title: t("boots"),
      icon: <GiSteeltoeBoots />,
      id: 14,
    },
    {
      title: t("toys"),
      icon: <MdToys />,
      id: 9,
    },
    {
      title: t("watches"),
      icon: <BsWatch />,
      id: 7,
    },
  ];

  const ref = useRef(null);
  useEffect(() => {
    console.log('width', ref.current ? ref.current.offsetWidth : 0);
    ref.current.offsetWidth < 500 ? setBalanceTitleFont('67px') : console.log(1);
    // ref.current.offsetWidth < 500 ? setCategoriesSlidesPerView(1) : console.log(1);
  }, [ref.current]);

  return (
    <>
      <div className="dashboard-tamplate">
        <Header />

        <div className="container" ref={ref} >
          <div className="block-slider">
            <div className="module-heading">
              <OtherCategories slider={true} categories={otherCategoriesArr} />

              <div
                className="balanceBox"
                style={{
                  backgroundImage: "url(" + Art + ")",
                }}
              >
                <div className="balanceBoxInner">
                  <h1 
                    className="headTitle"
                    style={{fontSize: BalanceTitleFont}}
                  >MallClub</h1>
                  <p className="balanceBoxTitle">{t("yourBalance")}</p>
                  <h6 className="balanceBoxprice">
                    {user?.money?.toFixed(1) || 0} ₪ /
                    {user?.credit?.toFixed(1) || 0} {t("e-credit")}
                  </h6>
                </div>
              </div>

              <div className="featured-product">
                <div className="module-heading">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <h6 className="module-heading__title">
                        {t("featuredCategories")}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="allCategory">
                  <OnlyCategoryList
                    slider={true}
                    categories={categories}
                    divClassName="featuredProduct-box"
                    h5ClassName="featuredProduct-box__title"
                  />
                </div>
              </div>



              <CouponsList />

              {/* <div className="row align-items-center">
                <div className="col-7">
                  <h6 className="module-heading__title">
                    {t("featuredVendors")}
                  </h6>
                </div>
                <div
                  className="col-5 text-right isLink"
                  onClick={() => {
                    navigate("/allvendors");
                  }}
                >
                  <div className="module-heading__link">{t("allvendors")}</div>
                </div>
              </div> */}
            </div>

            <VendorList isAllVendors={false} storesText={"stores"} />

            {/* <ScrollingCarousel>
              <ul className="categoryList">
                {merchants.length > 0
                  ? merchants.map((item) => (
                      <>
                        <li
                          onClick={() => {
                            navigate(`/vendor/${item.id}`, {
                              state: { id: item.id },
                            });
                          }}
                          className="categoryList__block isLink"
                        >
                          <div className="category-box text-center">
                            <div className="category-box__img">
                              <img
                                src={item.image}
                                className="img-fluid"
                                alt="My Awesome"
                              />
                            </div>
                            <h6 className="category-box__title">
                              {item.title}
                            </h6>
                          </div>
                        </li>
                      </>
                    ))
                  : t("No merchants")}
              </ul>
            </ScrollingCarousel> */}
          </div>
          {/*<ScrollingCarousel>*/}
          <Tabs
            defaultSelectedIndex={0}
            className="categoriesSliderTabs"
            onChange={handleChange}
          >
            <Tab value="all" label={t("all")}>
              All
            </Tab>
            {categories.length > 0 &&
              categories
                .filter((category) => !category.parent)
                .map((category) => (
                  <Tab value={category.id} label={category.title}>
                    {category.title}
                  </Tab>
                ))}
          </Tabs>
          {/*</ScrollingCarousel>*/}

          <div className="product-block">
            <ul className="product-Module">
              {filterProducts.length > 0
                ? currentFilterProducts.map((product) => (
                  <>
                    <li
                      className="product-Module__list isLink"
                      onClick={() => {
                        // if (product.imagename === "booking") {
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
                            <FavoriteBorderOutlinedIcon
                              onClick={() => handleFavChange()}
                            />
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
                              {product?.credit && (
                                <>
                                  {" "}
                                  + <br></br> {product.credit} e-credits
                                </>
                              )}
                            </span>
                          </div>
                          {/*<h5 className="product-box__name">*/}
                          {/*  3 {t("boxSimple")}{" "}*/}
                          {/*</h5>*/}
                        </div>
                      </div>
                    </li>
                  </>
                ))
                : t("No products")}
            </ul>
            {/* <ChatBot /> */}
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={filterProducts.length}
              paginate={paginate}
            />
          </div>
        </div>
      </div>
    </>
  );
}
