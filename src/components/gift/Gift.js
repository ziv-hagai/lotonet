import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Header from "../header/Header";
import GiftHeader from "./GiftHeader";
import For from "./For";
import How from "./How";
import Pay from "./Pay";
import Done from "./Done";
import Preview from "./Preview";
import GetGift from "./getGift/GetGift";

import "./Gift.css";

function Gift() {
  const location = useLocation();
  const {
    product,
    reciever = {
      getters: [],
      bless: "",
      product: null,
      amount: 0,
      date: "",
      time: "",
      senderName: "",
      card: "",
      exp: "",
      cvv: "",
    },
  } = location?.state;
  const [recieverNew, setRecieverNew] = useState();

  useEffect(() => {
    if (product) {
      reciever.amount = product?.price || 0;
      reciever.product = product;
      setRecieverNew(reciever);
    }
  }, [product]); // eslint-disable-line

  return (
    <>
      <Header />
      <div className="gift">
        <Routes>
          <Route
            path=""
            element={
              <>
                <GiftHeader className="for" product={product} />
                <div className="main">
                  <For reciever={recieverNew} />
                  <Preview reciever={recieverNew} />
                </div>
              </>
            }
          />
          <Route
            path="1"
            element={
              <>
                <GiftHeader className="how" step="1" product={product} />
                <div className="main">
                  <How reciever={reciever} />
                  <Preview reciever={reciever} />
                </div>
              </>
            }
          />
          <Route
            path="2"
            element={
              <>
                <GiftHeader className="pay" step="2" product={product} />
                <div className="main">
                  <Pay reciever={reciever} />
                  <Preview reciever={reciever} />
                </div>
              </>
            }
          />
          <Route path="3" element={<Done />} />
          <Route path="getgift" element={<GetGift />} />
        </Routes>
      </div>
    </>
  );
}

export default Gift;
