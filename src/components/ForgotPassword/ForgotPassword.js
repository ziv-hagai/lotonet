import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { TextField, Button, Card, CardContent } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../header/Header";
//import { login } from "../../redux/actions-exporter";

import "../login/login.css";

const App = () => {
  const navigate = useNavigate();
  //const dispatch = useDispatch();
  const { t } = useTranslation();
  const userId = useSelector((state) => state?.user?.user?.id);

  useEffect(() => {
    if (userId) return navigate("/");
  }, [userId, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = () => {};

  const keyDownHandler = (e, data) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)(data);
    }
  };

  return (
    <Fragment>
      <Header />
      <div className="mainContent">
        <div className="mainHeading">
          <div className="mainTitle">{t("Forgot password")}</div>
          <div className="mainText">
            {/* Just sign in if you have an acoount in here. Enjoy our Website */}
          </div>
        </div>
        <Card variant="outlined" className="cardStyle">
          <CardContent>
            <TextField
              required
              id="email"
              className="inputStyle"
              name="email"
              label={t("email")}
              fullWidth
              margin="dense"
              {...register("email")}
              error={!!errors.email}
              onKeyDown={keyDownHandler}
              // style={Styles.inputStyle}
            />
            {/* <div className="CheckLinkBlock">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={t("rememberMe")}
              />
              <Button className="forgotLink">
                <Link to="/login">
                  {t("Already have an account? Sign In now!")}
                </Link>
              </Button>
            </div> */}
            <div className="formBtn">
              <Button
                onClick={handleSubmit(onSubmit)}
                className="blueBtn"
                type="submit"
              >
                {t("Reset Password")}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20, boxShadow: "none" }}>
          <CardContent className="bottomLinks ">
            <span className="forgot">{t("Already have an account? ")}</span>
            <Link className="forgot" to="/login">
              {t("Sign In now!")}
            </Link>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};

export default App;
