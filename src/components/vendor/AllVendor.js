import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import { Tab, Tabs } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { CircularProgress } from "@mui/material";

import Header from "../header/Header";
import {
  getMerchants,
  getMerchantCategories,
} from "../../redux/actions-exporter";

import "../vendor/vendorsDetails.css";

export default function AllVendor() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const merchants = useSelector((state) => state.merchant.merchants);
  const merchantCategories = useSelector(
    (state) => state.merchantCategories.merchantCategories
  );
  const merchantsPending = useSelector(
    (state) => state.merchant.isMerchantsPending
  );
  const [selectedTab, setSelectedTab] = useState({ id: "all", title: "all" }); // eslint-disable-line
  const [categories, setCategories] = useState([]);
  const [merchantsList, setMerchantsList] = useState(merchants);
  const [FilterMerchants, setFilterMerchants] = useState([]);

  const handleChangeTab = (event, newValue) => {
    // setCurrentPage(1);
    console.log(newValue);
    if (newValue === "all") {
      setFilterMerchants(merchants);
    } else {
      let merchantsByCategoryById = [];
      merchantCategories.map((category) => {
        if (category.id === newValue) {
          category.merchants.map((merchant) => {
            merchantsByCategoryById.push(merchant);
            return merchant;
          });
        }
        return category;
      });
      setFilterMerchants(merchantsByCategoryById);
    }
  };
  console.log(merchantCategories);


  useEffect(() => {
    dispatch(getMerchants());
    dispatch(getMerchantCategories());
  }, [dispatch]); // eslint-disable-line

  useEffect(() => {
    setFilterMerchants(merchants);
  }, [merchants]);

  useEffect(() => {
    if (categories.length) return;
    //eslint-disable-next-line
    merchants?.map((merchant) => {
      //eslint-disable-next-line
      if (!merchant?.productCategories?.length) return;
      setCategories([...categories, ...merchant.productCategories]);
    });
  }, [merchants]); //eslint-disable-line

  useEffect(() => {
    if (selectedTab !== "all" && merchantsPending) return;
    return setMerchantsList(merchants);
  }, [merchantsPending]); //eslint-disable-line
  // merchants && console.log(merchants);
  const merchantCategoriesArr = [
    {
      title: t("ClothingAndFashionAccessories"),
      id: 1,
    },
    {
      title: t("footwear"),
      id: 2,
    },
    {
      title: t("HygieneCareAndBeauty"),
      id: 3,
    },
    {
      title: t("bookstoresAndSports"),
      id: 4,
    },
    {
      title: t("toysAndGames"),
      id: 5,
    },
    {
      title: t("foodAndCafes"),
      id: 6,
    },
    {
      title: t("housewares"),
      id: 7,
    },
    {
      title: t("electricalProductStores"),
      id: 8,
    },
  ];

  return (
    <div>
      <Header />

      <div className="pageTemplate">
        <div className="container">
          <ScrollingCarousel>
            <Tabs
              // value={selectedTab.id}
              onChange={handleChangeTab}
              className="categoriesSliderTabs"
            >
              <Tab value="all" label={t("all")}>
                {t("all")}
              </Tab>
              {merchantCategories?.map((category) => (
                <Tab value={category.id} label={category.title}>
                  {category.title}
                </Tab>
              ))}
            </Tabs>
          </ScrollingCarousel>
          {selectedTab.id === "all" && (
            <div className="vendorAllListBlock">
              <h6 className="module-heading__title">{t("popularVendors")}</h6>
              <ul className="categoryList">
                {merchants.length > 0 ? (
                  FilterMerchants.map((item) => (
                    <>
                      <li
                        className="categoryList__block isLink"
                        onClick={() => {
                          navigate(`/vendor/${item.id}`, {
                            state: { id: item.id },
                          });
                        }}
                      >
                        <div className="category-box text-center">
                          <span className="category-boxSubTitle">
                            12 {t("km")}
                          </span>
                          <div className="category-box__img">
                            <img
                              src={item.image}
                              className="img-fluid"
                              alt="My Awesome"
                            />
                          </div>
                          <h6 className="category-box__title">{t(item.title)}</h6>
                        </div>
                      </li>
                    </>
                  ))
                ) : merchantsPending ? (
                  <CircularProgress />
                ) : (
                  t("No merchants")
                )}
              </ul>
            </div>
          )}

          <div className="vendorAllListBlock">
            <h6 className="module-heading__title">
              {selectedTab.id !== "all"
                ? selectedTab.category.title
                : t("allvendors")}
            </h6>
            <ul className="categoryList">
              {merchantsList?.length > 0 ? (
                merchantsList.map((item) => (
                  <>
                    <li className="categoryList__block">
                      <div className="category-box text-center">
                        <span className="category-boxSubTitle">{item.km}</span>
                        <div className="category-box__img">
                          <img
                            src={item.image}
                            className="img-fluid"
                            alt="My Awesome"
                          />
                        </div>
                        <h6 className="category-box__title">{item.title}</h6>
                      </div>
                    </li>
                  </>
                ))
              ) : merchantsPending ? (
                <CircularProgress />
              ) : (
                t("No merchants")
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
