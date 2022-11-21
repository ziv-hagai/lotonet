import React, { Fragment, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "../header/Header";
import { login } from "../../redux/actions-exporter";

import "../login/login.css";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userId = useSelector((state) => state?.user?.user?.id);

  useEffect(() => {
    if (userId) return navigate("/");
  }, [userId, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    dispatch(
      login(data, () => {
        navigate("/");
      })
    );
  };

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
          <div className="mainTitle">{t("Sign In")}</div>
          <div className="mainText">
            {t(
              "Just sign in if you have an acoount in here. Enjoy our Website"
            )}
          </div>
        </div>
        <Card variant="outlined" className="cardStyle">
          <CardContent onKeyDown={keyDownHandler}>
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
              // style={Styles.inputStyle}
            />
            <TextField
              required
              id="password"
              name="password"
              label={t("password")}
              type="password"
              className="inputStyle"
              fullWidth
              margin="dense"
              {...register("password")}
              error={!!errors.password}
            />
            <div className="CheckLinkBlock">
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={t("rememberMe")}
              />
              <Button className="forgotLink">
                <Link to="/forgotPassword">{t("forgotPassword")}</Link>
              </Button>
            </div>
            <div className="formBtn">
              <Button
                onClick={handleSubmit(onSubmit)}
                className="blueBtn"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(onSubmit);
                  }
                }}
              >
                {t("login")}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20, boxShadow: "none" }}>
          <CardContent className="bottomLinks">
            {t("registerMessage")} <Link to="/register">{t("register")}</Link>
          </CardContent>
        </Card>
      </div>
    </Fragment>
  );
};

export default App;
