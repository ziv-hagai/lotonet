import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../header/Header";

import "../wallets/payment.css";

export default function Payment() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="paymentTemplate">
        <div className="container">
          <div className="templateHeading">
            <span
              className="backIcon isLink"
              onClick={() => {
                navigate("/wallet");
              }}
            >
              <ArrowBackIcon />
            </span>
            <h1 className="templateTitle">{t("paymentForPurchase")}</h1>
          </div>
          <div className="paymentCard">
            <p className="paymentCard-text">{t("topay")}</p>
            <div className="paymentCard-code">
              <CameraAltIcon value="hey" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
