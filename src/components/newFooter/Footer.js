import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import React, { useState } from 'react'

//icons
import HomeIcon from "@mui/icons-material/Home";
// import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { IoIosChatbubbles } from "react-icons/io";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";
import chatIcon from "../../assets/images/footer/chat.png";

import GrayIcon from "./GrayIcon";
import widgetHelper from "../../helpers/widget"

import "./Footer.css";

const containerArr = [
  {
    img: <HomeIcon />,
    link: "/",
  },
  {
    img: <StoreMallDirectoryIcon />,
    link: "/allvendors",
  },
  {
    img: <ShoppingCartIcon />,
    link: "/cart",
  },
  {
    img: <LocalMallIcon />,
    link: "/malls",
  },
  {
    img: <LocalOfferIcon />,
    link: "/sales",
  },
];

const Footer = () => {
  const [openSideBar, setOpenSideBar] = useState(false)
  const [openSideBarcomponent, setOpenSideBarcomponent] = useState('')
  let url = window.location.pathname;

  return (
    <>
      <BrowserView>
        <div className="webFooter">
          <div className={
                openSideBar
                  ? 'customizer border-left-blue-grey border-left-lighten-4 open'
                  : 'customizer border-left-blue-grey border-left-lighten-4 d-none d-md-block'
              }
          >
            <div className="customizer-toggle box-shadow-3">
              {containerArr.map((el, i) => {
                return (
                  <Link to={el.link} key={i}>
                    {el.img}
                  </Link>
                );
              })}

              <Link to="#">
                {openSideBar === false ? (
                  <IoIosChatbubbles onClick={() => setOpenSideBar(true)} />
                ) : (
                  <IoIosChatbubbles onClick={() => setOpenSideBar(false)} />
                )}
              </Link>
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div>
          <footer className="footer">
            <div className="sosAndGray">
              <div className="grayIcons">
                {containerArr.map((el, i) => {
                  return (
                    <GrayIcon
                      img={el.img}
                      i={i}
                      url={url}
                      key={i}
                      link={el.link}
                    />
                  );
                })}
              </div>
            </div>
            <div className="mainChat" onClick={() => widgetHelper.open()}>
              <img alt="" className="chat" src={chatIcon} />
            </div>
          </footer>
        </div>
      </MobileView>
    </>
  );
};

export default Footer;
