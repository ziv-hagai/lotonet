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
import AllCoupons from "../dashboard/coupon/coupon";

import Header from "../header/Header";
import { addToCart } from "../../redux/API/cart/cart.action";
import { getProductById } from "../../redux/API/product/product.action";
import QuantitySelector from "../quantitySelector";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import ProductSearch from "./ProductSearch"
import "swiper/swiper.min.css";
// import "../category/category.css";
import "./ProductDetails.css";
import {
  getMerchants,
  getMerchantCategories,
} from "../../redux/actions-exporter";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";

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

  const merchants = useSelector((state) => state.merchant.merchants);
  const merchantCategories = useSelector(
    (state) => state.merchantCategories.merchantCategories
  );

  useEffect(() => {
    dispatch(getMerchants());
    dispatch(getMerchantCategories());
  }, [dispatch]);
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
  const handleFavChange = () => {
  }
  merchants && console.log(merchants);

  return (
    <div>
      <Header />
      <div className="productDetails">
        <div className="container productTop">
          <div className="row">
            <div className="col-lg-6">
              <div className="productDetails-heading">
                <h5 className="productDetails-title">{product.title}</h5>
              </div>
              <div className="productDetails-info">
                <div className="productDetails-inputs">

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

          <div className="module-heading__link">רשתות מכבדות</div>
          <Swiper
            freeMode={true}
            slidesPerView={"auto"}
            spaceBetween={10}
            speed={10000}
            style={{ width: "auto", direction: "ltr" }}
            autoplay=
            {{
              delay: -10000,
              disableOnInteraction: false,
              // waitForTransition: false
            }}
            modules={[Autoplay]}
          >
            {merchants.length > 0
              ? merchants.map((item, index) => (
                <SwiperSlide
                  key={index}
                  style={{ width: "auto" }}
                  loop={true}

                  onClick={() => {
                    navigate(`/vendor/${item.id}`, {
                      state: { id: item.id },
                    });
                  }}
                  className="categoryList__block isLink"
                >
                  <div className="category-box text-center">
                    <div className="category-box__img">
                      <img
                        src={item.image}
                        className="img-fluid"
                        alt="My Awesome"
                      />
                    </div>
                    <h6 className="category-box__title">{t(item.title)}</h6>
                  </div>
                </SwiperSlide>
              ))
              : t("No merchants")}
          </Swiper>

          <ProductSearch />

          <ul className="store-Module">
            {merchants.length > 0
              ? merchants.map((store) => (
                <>
                  <li className="store-Module__list isLink">
                    <div className="store-box">
                      <div
                        onClick={() => {
                          navigate(`/vendor/${store.id}`, {
                            state: { id: store.id },
                          });
                        }}
                        className="store-box__img"
                        style={{ backgroundImage: `url(${store.image})` }}
                      >
                        <div className="store-box__likeBtn">
                          <FavoriteBorderOutlinedIcon
                            onClick={() => handleFavChange()}
                          />
                        </div>
                        <div className="store-box__kosher">
                          כשר למהדרין
                        </div>
                      </div>
                      <div className="store-box__info">
                        <h6 className="store-box__brand">
                          {store.title}
                        </h6>

                        <div className="address">
                          {store.address + ", " + store.city}
                        </div>
                        <div className="phone">
                          04-1234567
                        </div>
                      </div>

                      <div className="store-box__infoTop">


                        <Button
                          sx={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}

                          variant="outlined"
                          onClick={() => { }}
                          fullWidth
                        >
                          לפרטים נוספים
                        </Button>
                        <Button
                          sx={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}

                          variant="outlined"
                          onClick={() => { }}
                          fullWidth
                        >
                          לאתר החנות
                        </Button>
                      </div>

                    </div>
                  </li>
                </>
              ))
              : t("No products")}
          </ul>

        </div>
      </div>
    </div>
    // </div >
  );
}
