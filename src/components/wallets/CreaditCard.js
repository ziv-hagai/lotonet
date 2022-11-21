import React from "react";
//componet
import Header from "../header/Header";
//dependencies
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//css
import "../wallets/creaditcard.css";
//images
import PaymentCard from "../../assets/images/paymentCard.jpg";

export default function CreaditCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="creaditCardTemplate">
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
            <h1 className="templateTitle">{t("creditCardOorder")}</h1>
          </div>
          <div className="creaditMoneyCard">
            <img src={PaymentCard} className="img-fluid" alt="My Awesome" />
            <p className="creaditMoneyCard-Text">
              {t("nofees")}
              <span>250</span>
              {t("shekelsAsGift")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
