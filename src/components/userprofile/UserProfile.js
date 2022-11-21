import React, { useState } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "../header/Header";
import Dashboard from "../dashboard/Dashboard";
import YourAccount from "./account/YourAccount";
import ReferralProgram from "./referralprogram/ReferralProgram";
import Payments from "./payment/Payments";
import Chatting from "./chat/Chatting";
import Documents from "./document/Documents";
import Filemanager from "./filemanage/Filemanager";
import { logout } from "../../redux/actions-exporter";

import "../userprofile/userProfile.css";
import { ReactComponent as Arrow } from "../../assets/icons/arrow-right.svg";

function UserProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const [userPages, setUserPages] = useState("");
  const user = useSelector((state) => state?.user.user);
  const OpenSidebar = () => setClick(!click);

  const settings = [
    // {
    //   name: t("yourAccount"),
    //   key: "youraccount",
    //   desc: t("accountSettings,ChangeNumber"),
    // },
    // {
    //   name: t("referralProgram/Bonuses"),
    //   key: "referralprogram",
    //   desc: t("referralProgram/Bonuses"),
    // },
    // {
    //   name: t("chatting"),
    //   key: "chatting",
    //   desc: t("theme,Wallpaper,ChatHistory"),
    // },
    // {
    //   name: t("payments"),
    //   key: "payment",
    //   desc: t("payments"),
    // },
    // {
    //   name: t("documnents"),
    //   key: "document",
    //   desc: t("documnents"),
    // },
    // {
    //   name: t("fileManager"),
    //   key: "fileManager",
    //   desc: t("privacyPolicyDetail"),
    // },
  ];

  return (
    <>
      <Header />
      <div className={click ? "sidebarTamplate activeTabs" : "sidebarTamplate"}>
        <div className="sidebarModule">
          <div className="pageTamplate">
            <div className="container">
              <div className="settings">
                <div className="userBlock">
                  {user?.profileImage && (
                    <span className="userBlock-img">
                      <img
                        src={user.profileImage}
                        alt="img"
                        className="img-fluid"
                      />
                    </span>
                  )}
                  <div className="userBlock-Info">
                    <h2 className="userBlock-title">
                      {(user?.firstName || "") + " " + (user?.lastName || "")}
                    </h2>
                    {/*<h3 className="userBlock-subTitle">*/}
                    {/*  {t("digitalProduct")}*/}
                    {/*</h3>*/}
                    <p className="userBlock-subText">{user?.biography}</p>
                    <button className="btnEdit">{t("editProfile")}</button>
                    <button
                      className="btnEdit"
                      onClick={() => dispatch(logout(() => navigate("/")))}
                    >
                      {t("logout")}
                    </button>
                  </div>
                </div>

                <ul className="settingsList">
                  {settings.map((sett) => {
                    return (
                      <li
                        className="settingsListItem"
                        key={sett.name}
                        onClick={() => {
                          OpenSidebar();
                          setUserPages(sett.key);
                        }}
                      >
                        <div className="settingsListItem-heading">
                          <span className="settingsListItem-icon">
                            <PersonIcon />
                          </span>

                          <div className="right-sett">
                            <h6 className="settingsListItem-title">
                              {sett.name}
                            </h6>
                            <p className="settingsListItem-subtitle">
                              {sett.desc}
                            </p>
                          </div>
                        </div>
                        <span className="settingsListItem-img">
                          <Arrow />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="rightModule">
          <div className="container">
            <div className="d-block d-lg-none mb-2">
              <CloseOutlinedIcon onClick={() => setClick(false)} />
            </div>
            {userPages === "youraccount" ? (
              <YourAccount />
            ) : userPages === "referralprogram" ? (
              <ReferralProgram />
            ) : userPages === "payment" ? (
              <Payments />
            ) : userPages === "chatting" ? (
              <Chatting />
            ) : userPages === "document" ? (
              <Documents />
            ) : userPages === "fileManager" ? (
              <Filemanager />
            ) : (
              <Dashboard />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
