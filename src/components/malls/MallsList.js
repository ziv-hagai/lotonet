import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";

import noImage from "../../assets/images/noimage.png";

function MallsList({ divClassName, h5ClassName, categories, slider }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <>
      {categories.length ? (
        slider ? (
          <Swiper freeMode={true} slidesPerView={"auto"} spaceBetween={10}>
            {categories
              .filter((category) => !category.parent)
              .map((category, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    style={{ width: "auto" }}
                    onClick={() => {
                      navigate("/malldetials");
                      // navigate(`/category/${category.id}`, {
                      //   state: { id: category.id },
                      // });
                    }}
                  >
                    <div
                      className={divClassName}
                      style={{
                        backgroundImage: `url(${category.image || noImage})`,
                        width: "363px",
                        cursor: "pointer",
                      }}
                    >
                      <h5 className={h5ClassName}>{category.title}</h5>
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        ) : (
          <>
            {categories
              .filter((category) => !category.parent)
              .map((category, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      navigate("/malldetials");
                      // navigate(`/category/${category.id}`, {
                      //   state: { id: category.id },
                      // });
                    }}
                    className={divClassName}
                    style={{
                      backgroundImage: `url(${category.image || noImage})`,
                    }}
                  >
                    <h5 className={h5ClassName}>{category.title}</h5>
                  </li>
                );
              })}
          </>
        )
      ) : (
        t("No categories")
      )}
    </>
  );
}

export default MallsList;
