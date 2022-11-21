import { useTranslation } from "react-i18next";
import { TextField, Button, Card, CardContent } from "@material-ui/core";

import Header from "../header/Header";

import "../category/category.css";
import mallKids from "../../assets/images/mallKids.jpg";

export default function MallEvent() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <div className="productDetails mallEvent">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="mallEvent-info">
                <div className="mallEvent-info-date">
                  {t("date")}: 01.09 - 30.09
                </div>
                <div className="mallEvent-info-title">
                  {t("septemberOfTheChildren")}
                </div>
                <div className="mallEvent-info-p">
                  <div className="mallEvent-info-p1">
                    {t(
                      "septemberEventsForChildren,aVarietyOfSessionsAndPerformancesForChildrenInTheMallComplex"
                    )}
                  </div>
                  <div className="mallEvent-info-p2">
                    {t("SeptemberEventsForChildrenWillBeEverySundayAt")}17:30
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="productDetails-img">
                <img
                  src={mallKids}
                  alt=""
                  height={50}
                  width={50}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
          <div className="mainContent">
            <div className="mainHeading">
              <div className="mainTitle">{t("register")}</div>
              <div className="mainText">{t("registrationIsForNextSunday")}</div>
            </div>

            <Card variant="outlined" className="cardStyle">
              <CardContent>
                <div className="formRow">
                  <TextField
                    required
                    id="firstname"
                    className="inputStyle"
                    name="firstName"
                    label={t("firstname")}
                    fullWidth
                    margin="dense"
                    // style={Styles.inputStyle}
                  />

                  <TextField
                    required
                    id="lastname"
                    className="inputStyle"
                    name="lastName"
                    label={t("lastname")}
                    fullWidth
                    margin="dense"
                    // style={Styles.inputStyle}
                  />
                </div>

                <div className="formRow">
                  <TextField
                    required
                    id="phone"
                    className="inputStyle"
                    name="phone"
                    label={t("phonenumber")}
                    fullWidth
                    margin="dense"
                    // style={Styles.inputStyle}
                  />
                </div>

                <div>
                  <TextField
                    required
                    id="email"
                    className="inputStyle"
                    name="email"
                    label={t("mail")}
                    fullWidth
                    margin="dense"
                    // style={Styles.inputStyle}
                  />
                </div>

                <div className="formButtons">
                  {/* {showbutton && isagree === true ? (
                <Button onClick={() => navigate("/login")} className="grayBtn">
                  {t("login")}
                </Button>
              ) : null} */}
                  <Button className="blueBtn">{t("send")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
