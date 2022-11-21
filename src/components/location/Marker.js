import React from "react";
//css
import "./marker.css";
//dependencies
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
//icon
import { ReactComponent as Location } from "../../assets/icons/location.svg";

const Marker = ({ type, image, openInfoWindow, show, data, selectedMap }) => {
  const Input = styled("input")({
    display: "none",
  });

  const navigate = useNavigate();
  const { t } = useTranslation();
  // console.log(data);
  return (
    <div>
      <div
        onClick={openInfoWindow}
        className="pin bounce"
        style={{
          backgroundColor: "var(--primary)",
          cursor: "pointer",
          width: 40,
          height: 40,
          position: "absolute",
          padding: 2,
        }}
        title={`${data.title}`}
      >
        <span
          style={{
            backgroundImage: `url(${image})`,
            backgroundColor: "white",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            height: 35,
            width: 35,
            display: "block",
            borderRadius: 50,
            overflow: "hidden",
            transform: "rotate(45deg)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "#fff",
          }}
        ></span>
      </div>

      <div className="pulse" />
      {show && selectedMap.id === data.id ? (
        <div
          style={{
            width: 200,
          }}
        >
          <div
            className="product-preview col product-preview--map"
          // onClick={() => {
          //   type === "shop" ?
          //     navigate(
          //       `/vendor/${data.id}`, {
          //       state: { id: data.id },
          //     })
          //     :
          //     navigate(
          //       `/product/${data.id}`, {
          //       state: { id: data.id },
          //     });
          // }}
          >
            <CloseIcon onClick={openInfoWindow} />
            <img className="img" src={data.image} alt="" />

            <div className="productDetails">
              <div className="productDetailsHead flex"> </div>

              <div className="productTitle">{data.title}</div>

              {type === "product" ? (
                <div className="price">{data?.price || 0}$</div>
              ) : null}
              <div className="location">
                <Location />

                <div className="locationDetails">
                  <div className="address">{data?.address}</div>
                  <div className="city">{data?.city}</div>
                </div>
              </div>

              {/* <div className="price">{data?.city }</div> */}

              <div className="mapCardFooter flex">
                {/* <div className="distance">{data.distance || '100 meter'}</div> */}

                {/* <div
                  className="type isLink"
                  onClick={() => {
                    if (data.type === "company") {
                      navigate("/company", {
                        state: { isBookingApp: true },
                      });
                    } else if (data.type === "mall") {
                    } else if (data.type === "shop") {
                    } else {
                      navigate("/categorydetails", {
                        state: { categoryDetails: data },
                      });
                    }
                  }}
                >
                  {data.type}
                </div> */}
              </div>
              <div className="product-preview-status">
                <Chip label={t("navigate")} />
                <Chip
                  label={t("open")}
                  onClick={() => {
                    type === "shop"
                      ? navigate(`/vendor/${data.id}`, {
                        state: { id: data.id },
                      })
                      : navigate(`/product/${data.id}`, {
                        state: { id: data.id },
                      });
                  }}
                />
                <Input id="icon-button-file" type="button" />
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  className="likeBtn"
                >
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
              </div>
              <div className="type">
                {t("Cupon:")}
                {data.cupon}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Marker;
