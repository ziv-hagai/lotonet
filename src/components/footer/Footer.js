import React from "react";
//css
import "./footer.css";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalOfferOutlinedIcon from "@material-ui/icons/LocalOfferOutlined";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ForumOutlinedIcon from "@material-ui/icons/ForumOutlined";

const Footer = () => {
  return (
    <div className="mainfooter">
      <div className="row">
        <div className="col">
          <a href="#" className="mainfooter__btns active">
            <HomeOutlinedIcon />
          </a>
        </div>
        <div className="col">
          <a href="#" className="mainfooter__btns">
            <LocalOfferOutlinedIcon />
          </a>
        </div>
        <div className="col">
          <a href="#" className="mainfooter__btns">
            <NotificationsNoneOutlinedIcon />
          </a>
        </div>
        <div className="col">
          <a href="#" className="mainfooter__btns">
            <PersonOutlineOutlinedIcon />
          </a>
        </div>
        <div className="col">
          <a href="#" className="mainfooter__btns mainfooter__btns--large">
            <ForumOutlinedIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
export default Footer;
