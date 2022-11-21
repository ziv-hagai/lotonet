import "./Sales.css";
import { useTranslation } from "react-i18next";

//components
import Header from "../header/Header";
import SalesList from "./SalesList";

export default function Sales() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="pageTemplate sales">
        <div className="container">
          <div className="PageBgHeading">
            <h5 className="PageBgHeading-title">{t("promotions")}</h5>
          </div>

          <SalesList isNotScrolling={true} />
        </div>
      </div>
    </div>
  );
}
