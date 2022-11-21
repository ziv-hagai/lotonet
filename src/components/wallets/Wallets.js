import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import Header from "../header/Header";
import CouponList from "./couponList/CouponList";
import { sendMoney } from "../../redux/actions-exporter";

import "../wallets/wallets.css";

export default function Wallets() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.user);
  const sendMoneyError = useSelector((state) => state.user.sendMoneyError);
  const [amountType, setAmountType] = useState("money");
  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [email, setEmail] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    if (!user?.id) return navigate("/login");
    // if (!user?.result?.id) {
    //   if (window?.B24Chat?.instance) {
    //     const instance = window?.B24Chat?.instance;
    //     instance.login();
    //     return;
    //   } else {
    //     return navigate("/");
    //   }
    // }
    setMaxAmount(user?.money || 0);
  }, [user, navigate]);

  const onSend = () => {
    dispatch(
      sendMoney(
        {
          amountType,
          amount,
          email,
          purpose,
        },
        () => toast.success("Money has been successfully sent"),
        () => toast.error(sendMoneyError.response.data.message)
      )
    );
  };

  return (
    <div>
      <Header />
      <div className="walletTamplate">
        <div className="container">
          <div className="walletIcons">
            <div
              className="walletIconsBox isLink"
              onClick={() => {
                navigate("/payment");
              }}
            >
              <PaymentIcon />
              <h6 className="walletIconsBox-title">
                {t("paymentForPurchase")}
              </h6>
            </div>
            <div
              className="walletIconsBox isLink"
              onClick={() => {
                navigate("/loadmoney");
              }}
            >
              <LocalAtmIcon />
              <h6 className="walletIconsBox-title">{t("loadMoney")}</h6>
            </div>
            <div
              className="walletIconsBox isLink"
              onClick={() => {
                navigate("/loadcredit");
              }}
            >
              <LocalAtmIcon />
              <h6 className="walletIconsBox-title">{t("Load E-Credit")}</h6>
            </div>
            <div
              className="walletIconsBox isLink"
              onClick={() => {
                navigate("/creaditcard");
              }}
            >
              <CreditScoreIcon />
              <h6 className="walletIconsBox-title">{t("creditCardOorder")}</h6>
            </div>
            <div
              className="walletIconsBox isLink"
              onClick={() => {
                navigate("/allvendors");
              }}
            >
              <StoreIcon />
              <h6 className="walletIconsBox-title">{t("shop")}</h6>
            </div>
          </div>

          <div className="walletBtns">
            <Button
              className="blueBtn"
              onClick={() => {
                navigate("/paymenthistory");
              }}
            >
              {t("paymentHistory")}
            </Button>
          </div>

          <div className="moneyBlock">
            <div className="moneyBlock-heading">
              <h2 className="moneyBlock-title">{t("moneyBalances")}</h2>
              <h3 className="moneyBlock-price">
                {user?.money?.toFixed(1) || 0}₪/{user?.credit?.toFixed(1) || 0}{" "}
                e-credit
              </h3>
            </div>
            <div className="walletBtns">
              <Button onClick={() => setShow(true)} className="blueBtn">
                {t("moneyTransfer")}
              </Button>
            </div>
          </div>

          <div>
            {show ? (
              <div className="ContactUsModule">
                <h6 className="ContactUsModule-title"> {t("sendMoney")}</h6>
                <Select
                  labelId="amount-type"
                  id="amount-type"
                  name="select"
                  value={amountType}
                  label={t("Amount type")}
                  style={{ border: 0, direction: "ltr" }}
                  className="inputStyle inputStyle-select"
                  onChange={(e) => {
                    setAmountType(e.target.value);
                    setMaxAmount(user[e.target.value]);
                    setAmount(0);
                  }}
                >
                  <MenuItem value="money">{t("Money")}</MenuItem>
                  <MenuItem value="credit">{t("Credit")}</MenuItem>
                </Select>
                <TextField
                  required
                  id="Amount"
                  className="inputStyle"
                  name="Amount"
                  label={t("Amount")}
                  fullWidth
                  InputProps={{ inputProps: { min: 0, max: maxAmount } }}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  type="number"
                  margin="dense"
                />
                <TextField
                  required
                  id="User"
                  name="User"
                  label={t("User email")}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="inputStyle"
                  fullWidth
                  margin="dense"
                />
                <TextField
                  required
                  id="Transfer purpose"
                  name="Transfer purpose"
                  label={t("Transfer purpose")}
                  onChange={(e) => setPurpose(e.target.value)}
                  type="text"
                  className="inputStyle"
                  fullWidth
                  margin="dense"
                />
                <div className="formBtn">
                  <Button onClick={() => setShow(false)} className="blueBtn">
                    {t("cancel")}
                  </Button>
                  <Button onClick={onSend} className="blueBtn">
                    {" "}
                    {t("send")}
                  </Button>
                </div>
              </div>
            ) : null}

            <CouponList />
          </div>
        </div>
      </div>
    </div>
  );
}
