import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import Header from "../header/Header";
import OnlyCategoryList from "./OnlyCategoryList";
import { getProductCategories } from "../../redux/API/productCategories/productCategories.action";

import Ipad from "../../assets/images/ipad.jpg";

function CategoryList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  useEffect(() => {
    dispatch(getProductCategories());
  }, [dispatch]); // eslint-disable-line

  return (
    <div>
      <Header />
      <div className="pageTemplate">
        <div className="container">
          <div
            className="PageBgHeading"
            style={{ backgroundImage: `url(${Ipad})` }}
          >
            <h5 className="PageBgHeading-title">{t("categories")}</h5>
          </div>
          <div className="categoryMainListModule">
            <h6 className="module-heading__title">{t("featuredCategories")}</h6>
            <div className="categoryMainList">
              <OnlyCategoryList
                categories={categories}
                divClassName="featuredcategory-box"
                h5ClassName="featuredcategory__title"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CategoryList;
