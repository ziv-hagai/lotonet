import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControl from "@mui/material/FormControl";
import { FormGroup, TextField } from '@mui/material';

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import Header from "../header/Header";
import { addToCart } from "../../redux/API/cart/cart.action";
import { getProductById } from "../../redux/API/product/product.action";
import QuantitySelector from "../quantitySelector";

import "../category/category.css";

export default function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id } = location?.state;
  const product = useSelector((state) => state.product.product);
  const [numbersOfItems, setNumbersOfItems] = useState(1);
  const userId = useSelector((state) => state?.user?.user?.id);
  const [num, setNum] = useState(1);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]); //eslint-disable-line

  const handleChangeQuantity = (e) => setNumbersOfItems(e.target.value);

  const handleAddProduct = (product) => {
    if (!userId) return navigate("/login");
    dispatch(addToCart(product?.id, numbersOfItems, product?.bonusRuleId));
    toast.success("The product has been successfully added");
  };

  useEffect(() => {
    if (product && product?.type === "gift") {
      navigate("/gift", {
        state: { product },
      });
    }
  }, [product]); //eslint-disable-line

  product && console.log(product);

  return (
    <div>
      <Header />
      <div className="productDetails">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="productDetails-info">
                <div className="productDetails-heading">
                  <h5 className="productDetails-title">{product.title}</h5>

                  {product.price > 50 ?
                    (<div>{product.price} ₪</div>)
                    :
                    (<>
                      ₪
                      <FormControl
                        sx={{ maxWidth: 80 }}        >
                        <TextField
                          size="small"
                          type="text"
                          id="search-bar"
                          placeholder="סכום"
                        />
                      </FormControl>
                    </>)
                  }
                  <FormControl size="small" sx={{ minWidth: 60 }}>
                    <Select
                      autoWidth
                      value={num}
                      displayEmpty
                      inputProps={{ "aria-label": "Without label" }}
                      InputLabelProps={{ shrink: false }}
                      onChange={(e) => setNum(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    sx={{ height: 40 }}
                    variant="outlined"
                    onClick={() => { }}
                  >
                    לרכישה
                  </Button>
                </div>

                <div
                  onClick={() => {
                    navigate(`/vendor/${product.merchant.id}`, {
                      state: { id: product.merchant.id },
                    });
                  }}
                  className="productDetails-brand"
                >
                  {product?.merchant?.image && (
                    <span className="productDetails-brandImage">
                      <img
                        src={product.merchant.image}
                        alt=""
                        height={20}
                        width={20}
                        className="img-fluid"
                      />
                    </span>
                  )}
                  <p className="productDetails-brandName">
                    {product?.merchant?.title || t("No merchant")}
                  </p>
                </div>
                <div className="productDetails-content">
                  <h6 className="productDetails-contentTitle">
                    {t("description")}
                  </h6>
                  <p className="productDetails-contentText">
                    {product?.content || ""}
                  </p>
                </div>

              </div>
            </div>
            <div className="col-lg-5 offset-lg-1">
              <div className="productDetails-img">

                <img
                  src={product?.image}
                  alt=""
                  height={50}
                  width={50}
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
