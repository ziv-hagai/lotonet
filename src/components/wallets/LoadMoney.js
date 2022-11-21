import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import Header from "../header/Header";
import { addMoney } from "../../redux/API/user/user.action";

import "../wallets/loadmoney.css";

export default function LoadMoney({ credit = false }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [money, setMoney] = useState(0.0);
  const [newMoney, setNewMoney] = useState(0);

  const onChange = (e) => {
    const value = parseFloat(e.currentTarget.value) || 0;
    if (value >= 0) {
      setNewMoney(value);
      setMoney((user[credit ? "credit" : "money"] || 0) + value);
    }
  };

  return (
    <div>
      <Header />
      <div className="loadMoneyTemplate">
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
            <h1 className="templateTitle">
              {t(credit ? "Load E-Credit To Wallet" : "loadMoneyToWallet")}
            </h1>
          </div>
          <div className="loadMoneyCard">
            <div className="loadMoneyCard-price">
              <input
                type="number"
                step="1"
                min="0.00"
                defaultValue="0.00"
                onChange={onChange}
              />
            </div>
            <ArrowDownwardIcon />
            <h2 className="loadMoneyCard-text">
              {t("newBalanceAfterTransfers")}
            </h2>
            <h1 className="loadMoneyCard-price">{money?.toFixed(1) || 0}</h1>
            <div className="loadMoneyCard-btn">
              <Button
                className="blueBtn"
                onClick={() => {
                  dispatch(addMoney(newMoney, credit));
                  navigate("/checkout");
                }}
              >
                {t(credit ? "Load E-Credit" : "loadMoney")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
