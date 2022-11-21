import React, { useEffect, useMemo, useState } from "react";
import { Select, TextareaAutosize } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import {
  TextField,
  Checkbox,
  Button,
  Card,
  CardContent,
  MenuItem,
} from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import Header from "../header/Header";
import { register as reg } from "../../redux/actions-exporter";
import MuiNumberFormat from "../UI/MuiNumberFormat";

import "../register/register.css";

const PhoneNumberField = React.forwardRef(MuiNumberFormat);

export default function Register() {
  const [isagree, setIsagree] = useState(false);
  const dispatch = useDispatch();
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [isValidForm, setValidForm] = useState(false);
  const [country, setCountry] = useState("");
  const { t } = useTranslation();
  const [unformattedPhoneNumber, setPhoneNumber] = useState("");
  const user = useSelector((state) => state.user.user);
  const registerError = useSelector((state) => state.user.registerError);
  const navigate = useNavigate();

  const countryList = useMemo(
    () => [
      { label: "India", value: "india" },
      { label: "Australia", value: "australia" },
      { label: "Brazil", value: "brazil" },
    ],
    []
  );

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  useEffect(() => {
    if (user?.id) return navigate("/");
  }, [user, navigate]);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    phone: Yup.string().required("Phone Number is required"),
    // .matches(
    //   /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    //   "Phone number is not valid"
    // )
    biography: Yup.string(),
    country: Yup.string().required("you need to select one country"),
    cPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    data["phone"] = unformattedPhoneNumber;
    delete data["cPassword"];

    dispatch(
      reg(
        data,
        () => navigate("/"),
        () => toast.error(registerError.response.data.message)
      )
    );
  };

  const handleChangePhoneNumber = (e) => setPhoneNumber(e.target.value);

  const keyDownHandler = (e, data) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)(data);
    }
  };

  return (
    <div>
      <Header />
      <div className="mainContent">
        <div className="mainHeading">
          <div className="mainTitle">{t("register")}</div>
          <div className="mainText">{t("signup")}</div>
        </div>

        <Card variant="outlined" className="cardStyle">
          <CardContent onKeyDown={keyDownHandler}>
            <div className="formRow">
              <TextField
                required
                id="firstname"
                className="inputStyle"
                name="firstName"
                label={t("firstname")}
                fullWidth
                margin="dense"
                {...register("firstName")}
                error={!!errors.firstName}
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
                {...register("lastName")}
                error={!!errors.lastName}
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
                {...register("phone")}
                margin="dense"
                error={!!errors.phone}
                onChange={handleChangePhoneNumber}
                InputProps={{
                  inputComponent: PhoneNumberField,
                }}
                // style={Styles.inputStyle}
              />

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="select"
                value={country}
                label={t("country")}
                className="inputStyle inputStyle-select"
                {...register("country")}
                onChange={handleCountryChange}
                error={!!errors.select}
              >
                {countryList.map((item) => {
                  return <MenuItem value={item.label}>{item.label}</MenuItem>;
                })}
              </Select>
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
                {...register("email")}
                error={!!errors.email}
                // style={Styles.inputStyle}
              />
            </div>

            <div className="formRow">
              <TextField
                required
                id="password"
                className="inputStyle"
                name="password"
                label={t("password")}
                fullWidth
                type="password"
                margin="dense"
                {...register("password")}
                error={!!errors.password}
                // style={Styles.inputStyle}
              />

              <TextField
                required
                id="cPassword"
                className="inputStyle"
                name="cPassword"
                label={t("confirmPassword")}
                fullWidth
                margin="dense"
                {...register("cPassword")}
                type="password"
                error={!!errors.cPassword}
                // style={Styles.inputStyle}
              />
            </div>

            <div>
              <h6 className="inputLabel">{t("tell")}</h6>
              <TextareaAutosize
                aria-label="empty textarea"
                name="biography"
                placeholder={t("helloname")}
                className="textAreaBox"
                {...register("biography")}
              />
            </div>

            <div className="CheckLinkBlock">
              <FormControlLabel
                control={<Checkbox />}
                checked={isagree}
                onChange={(e) => setIsagree(e.target.checked)}
                label={t("iagree")}
              />
            </div>

            <div className="formButtons">
              {/* {showbutton && isagree === true ? (
                <Button onClick={() => navigate("/login")} className="grayBtn">
                  {t("login")}
                </Button>
              ) : null} */}
              <Button
                onClick={handleSubmit(onSubmit)}
                className="blueBtn"
                disabled={!isagree}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(onSubmit);
                  }
                }}
              >
                {t("getStarted")}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card style={{ marginTop: 20, boxShadow: "none" }}>
          <CardContent className="bottomLinks">
            {t("alreadyaccount")} <Link to="/login">{t("log in")}</Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
