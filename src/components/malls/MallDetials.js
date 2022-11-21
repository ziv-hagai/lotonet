import "./Malls.css";
import React from "react";
import { useTranslation } from "react-i18next";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Header from "../header/Header";
import VendorList from "../dashboard/VendorList";
import SalesList from "../sales/SalesList";
import MallAbout from "./MallAbout";
import MallEventsList from "./MallEventsList";

import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import EmailIcon from "@mui/icons-material/Email";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import mallKids from "../../assets/images/mallKids.jpg";
import mall1 from "../../assets/images/mall1.jpg";
import mall2 from "../../assets/images/mall2.jpg";
import mall3 from "../../assets/images/mall3.jpg";
import mall4 from "../../assets/images/mall4.jpg";
import mall5 from "../../assets/images/mall5.jpg";
import mall6 from "../../assets/images/mall6.jpg";

function MallDetials() {
  const { t } = useTranslation();

  const mallsCategoriesArr = [
    {
      title: t("about"),
      id: 1,
    },
    {
      title: t("accessibility"),
      id: 2,
    },
  ];

  const eventsArr = [
    {
      image: mallKids,
      title: t("septemberOfTheChildren"),
      link: "/mallevent",
    },
    {
      image: mallKids,
      title: t("septemberOfTheChildren"),
      link: "/mallevent",
    },
    {
      image: mallKids,
      title: t("septemberOfTheChildren"),
      link: "/mallevent",
    },
  ];

  const galeryArr = [
    {
      image: mall1,
    },
    {
      image: mall2,
    },
    {
      image: mall3,
    },
    {
      image: mall4,
    },
    {
      image: mall5,
    },
    {
      image: mall6,
    },
  ];

  const displyTuggle = (e) => {
    const mallAbout = document.querySelector(".blog");
    const accessibility = document.querySelector(".accessibility");
    const elementName = e.target.textContent;

    if (elementName === "אודות" || elementName === "About") {
      accessibility.style.display = "none";
      if (mallAbout.style.display === "flex") {
        mallAbout.style.display = "none";
        e.target.style.color = "black";
      } else {
        mallAbout.style.display = "flex";
        e.target.style.color = "var(--primary)";
        e.target.nextElementSibling.style.color = "black";
      }
    } else if (elementName === "נגישות" || elementName === "Accessibility") {
      mallAbout.style.display = "none";
      if (accessibility.style.display === "block") {
        accessibility.style.display = "none";
        e.target.style.color = "black";
      } else {
        accessibility.style.display = "block";
        e.target.style.color = "var(--primary)";
        e.target.previousElementSibling.style.color = "black";
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="pageTemplate malls">
        <div className="container">
          <div className="PageBgHeading">
            <h5 className="PageBgHeading-title mallDetails-title">
              {t("grandMall")}
            </h5>
            <div className="mallContact">
              <PhoneEnabledIcon className="phone" />
              <EmailIcon className="email" />
              <FacebookRoundedIcon className="facebook" />
              <NearMeRoundedIcon className="navigate" />
            </div>
          </div>

          <div className="aboutAndAccessibilityMenu">
            <Tabs defaultSelectedIndex={0} className="categoriesSliderTabs">
              {mallsCategoriesArr.length > 0 &&
                mallsCategoriesArr.map((category) => (
                  <Tab
                    onClick={displyTuggle}
                    value={category.id}
                    label={category.title}
                  >
                    {category.title}
                  </Tab>
                ))}
            </Tabs>
          </div>

          <MallAbout />

          <div className="accessibilityDiv">
            <div className="accessibility">
              <h1>{t("MallAccessibilityArrangements")}</h1>
              <ul>
                <li>
                  {t(
                    "InTheMallThereAreAccessibleParkingSpacesForNormalCarsAndHighCars"
                  )}
                </li>
                <li>{t("TheEntranceToTheMallIsAccessible")}</li>
                <li>{t("TheElevatorsInTheMallAreAccessible")}</li>
                <li>{t("ThereAreAccessibleRestroomsInTheMall")}</li>
              </ul>
            </div>
          </div>

          <VendorList isAllVendors={false} storesText={"mallsStores"} />

          <div className="module-heading">
            <div className="row align-items-center">
              <div className="col-12">
                <h6 className="module-heading__title mallVideo-title">
                  {t("promotionalVideo")}
                </h6>
              </div>
            </div>
          </div>
          <div className="videoDiv">
            <iframe
              title=" "
              src="https://www.youtube.com/embed/zOgxf1YAZgM?feature=oembed"
            />
          </div>

          <MallEventsList arr={eventsArr} header={t("events")} />

          <SalesList isNotScrolling={false} />

          <MallEventsList arr={galeryArr} header={t("galery")} />
        </div>
      </div>
    </div>
  );
}
export default MallDetials;
