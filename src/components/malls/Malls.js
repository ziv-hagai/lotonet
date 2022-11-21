import React from "react";
import { useTranslation } from "react-i18next";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Header from "../header/Header";
import MallsList from "./MallsList";

import "./Malls.css";
import mall1 from "../../assets/images/mall1.jpg";
import mall2 from "../../assets/images/mall2.jpg";
import mall3 from "../../assets/images/mall3.jpg";
import mall4 from "../../assets/images/mall4.jpg";
import mall5 from "../../assets/images/mall5.jpg";
import mall6 from "../../assets/images/mall6.jpg";

function Malls() {
  const { t } = useTranslation();

  const mallsArr = [
    {
      image: mall1,
      title: t("grandMall"),
    },
    {
      image: mall2,
      title: t("premiumCenter"),
    },
    {
      image: mall3,
      title: t("rogovinCenter"),
    },
    {
      image: mall4,
      title: t("TheSquareMall"),
    },
    {
      image: mall5,
      title: t("shafirCenter"),
    },
    {
      image: mall6,
      title: t("cinemaCity"),
    },
  ];

  const mallsCategoriesArr = [
    {
      title: t("north"),
      id: 1,
    },
    {
      title: t("sharon"),
      id: 2,
    },
    {
      title: t("center"),
      id: 3,
    },
    {
      title: t("jerusalemAndTheShfela"),
      id: 4,
    },
    {
      title: t("south"),
      id: 5,
    },
  ];

  return (
    <div>
      <Header />
      <div className="pageTemplate malls">
        <div className="container">
          <div className="PageBgHeading">
            <h5 className="PageBgHeading-title">{t("malls")}</h5>
          </div>

          <Tabs
            defaultSelectedIndex={0}
            className="categoriesSliderTabs"
            // onChange={handleChange}
          >
            <Tab value="all" label={t("all")}>
              All
            </Tab>
            {mallsCategoriesArr.length > 0 &&
              mallsCategoriesArr.map((category) => (
                <Tab value={category.id} label={category.title}>
                  {category.title}
                </Tab>
              ))}
          </Tabs>

          <div className="categoryMainListModule">
            <div className="categoryMainList">
              <MallsList
                categories={mallsArr}
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
export default Malls;
