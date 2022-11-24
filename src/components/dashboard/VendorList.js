import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ScrollingCarousel } from "@trendyol-js/react-carousel";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {
  getMerchants,
  getMerchantCategories,
} from "../../redux/actions-exporter";

export default function VendorList(props) {
  // const [merchant, setMerchant] = useState([]);
  const [FilterMerchants, setFilterMerchants] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const merchants = useSelector((state) => state.merchant.merchants);
  const merchantCategories = useSelector(
    (state) => state.merchantCategories.merchantCategories
  );
  // console.log(merchants);
  // console.log(merchantCategories);
  useEffect(() => {
    setFilterMerchants(merchants);
  }, [merchants]); // eslint-disable-line
  useEffect(() => {
    dispatch(getMerchants());
    dispatch(getMerchantCategories());
  }, [dispatch]); // eslint-disable-line

  const handleChange = (event, newValue) => {
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
    <>
      <div className="row align-items-center">
        <div className="col-7">
          <h6 className="module-heading__title">{t(props.storesText)}</h6>
        </div>
        <div
          className="col-5 text-right isLink"
          onClick={() => {
            navigate("/allvendors");
          }}
        >
          {props.isAllVendors ? (
            <div className="module-heading__link">{t("allStores")}</div>
          ) : (
            ""
          )}
        </div>
      </div>

      <Tabs
        defaultSelectedIndex={0}
        className="categoriesSliderTabs"
        onChange={handleChange}
      >
        <Tab value="all" label={t("all")}>
          All
        </Tab>
        {merchants.length > 0
          ? merchantCategories?.map((category) => (
            <Tab value={category.id} label={category.title}>
              {category.title}
            </Tab>
          ))
          : ""}
      </Tabs>

      <ScrollingCarousel>
        <ul className="categoryList">
          {merchants.length > 0
            ? FilterMerchants.map((item) => (
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
                    <h6 className="category-box__title">{t(item.title)}</h6>
                  </div>
                </li>
              </>
            ))
            : t("No merchants")}
        </ul>
      </ScrollingCarousel>
    </>
  );
}
