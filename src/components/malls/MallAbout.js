import { useTranslation } from "react-i18next";

import mallAbout from "../../assets/images/mallAbout.jpg";

const MallAbout = () => {
  const { t } = useTranslation();

  return (
    <div className="blog">
      <div className="blogContent pad">
        <div className="blogContentH">{t("aboutTheMall")}</div>
        <div className="blogContentP">
          {t("aboutTheMallP1")}
          <br></br>
          {t("aboutTheMallP2")}
        </div>
      </div>
      <div className="blogImgDiv">
        <img alt="" className="blogImg" src={mallAbout} />
      </div>
    </div>
  );
};

export default MallAbout;
