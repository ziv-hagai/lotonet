import React, { useState, useEffect } from "react";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import MicIcon from "@mui/icons-material/Mic";
import PersonOutline from "@material-ui/icons/PersonOutline";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import Clear from "@material-ui/icons/Clear";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
// import SettingsIcon from "@mui/icons-material/Settings";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
// import StorefrontIcon from "@mui/icons-material/Storefront";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Slider } from "@material-ui/core";
import { Button } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormGroup, TextField } from "@mui/material";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LanguageSelect from "../language/languageSelect";
import {
  setGetTabbingValue,
  logout,
  setProductCategoryFilter,
} from "../../redux/actions-exporter";
import SearchResult from "../searchResult/SearchResult";
import widgetHelper from "../../helpers/widget";

import profile from "../../assets/icons/profile.svg";
// import groupChat from "../../assets/icons/group-chat.svg";
// import Vacant from "../../assets/icons/vacantLand.svg";
// import card from "../../assets/icons/cart.svg";
// import location from "../../assets/icons/location.svg";
import "./search.css";
// import search from "../../assets/images/search.png";
import Logo from "../../assets/images/lg_logo.jpg";

const Search = ({ isMap, mapSearch }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isSizeSelected, sizeSelected] = useState(false); // eslint-disable-line
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [subToggleMenu, setSubToggleMenu] = useState(false);
  const [notification, setNotification] = useState(false);
  const { tabbingValue } = useSelector((state) => state.tabbing);
  const [value, setValue] = useState(tabbingValue);
  const [click, setClick] = useState(false); // eslint-disable-line
  const [filter, setFilter] = useState({});
  const [area, setArea] = useState("אזור");
  const [city, setCity] = useState("ישוב");
  const [category, setCategory] = useState("קטגוריה");

  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [stores, setStores] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [filterStores, setFilterStores] = useState([]);

  const productCategories = useSelector(
    (state) => state.productCategories.originalProductCategories
  );
  const merchants = useSelector((state) => state.merchant.merchants);
  // const x = useSelector((state) => state);

  //  search
  useEffect(() => {
    if (productCategories.length) {
      const prepareProduct = productCategories.reduce(
        (previous, current) => [
          ...previous,
          ...current.products.map((product) => ({
            ...product,
            categoryId: current.id,
            categoryName: current.title,
          })),
        ],
        []
      );
      setProducts(prepareProduct);
      setStores(merchants);
    }
  }, [productCategories]); // eslint-disable-line

  useEffect(() => {
    if (products.length) {
      const prices = [];
      products.forEach((product) => {
        if (product?.price) {
          prices.push(parseFloat(product.price));
        }
      });

      if (prices.length) {
        prices.sort((a, b) => a - b);
        setMinPrice(prices[0]);
        setMaxPrice(prices[prices.length - 1]);
      }
    }
  }, [products]);

  useEffect(() => {
    const filteredP = products.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    filteredP === products
      ? setFilterProducts([])
      : setFilterProducts(filteredP);

    const filteredS = stores.filter((store) =>
      store.title.toLowerCase().includes(searchText.toLowerCase())
    );

    filteredS === stores ? setFilterStores([]) : setFilterStores(filteredS);
  }, [searchText]); // eslint-disable-line

  const openSearch = () => {
    document.querySelector(".menuSearch").style.display = "none"
      ? "block"
      : "none";
  };
  // end search

  const cartCount = useSelector((state) => state.cart.count);
  const user = useSelector((state) => state?.user?.user);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      dispatch(setGetTabbingValue(newValue));
      navigate("/");
    }
    if (newValue === 1) {
      // navigate("/allvendors");
      dispatch(setGetTabbingValue(newValue));
    }
    if (newValue === 2) {
      dispatch(setGetTabbingValue(newValue));
      // navigate("/categorylist");
    }
  };

  const closeMobileMenu = () => setClick(false);

  const onFilter = (e) => {
    console.log(filter);
    dispatch(setProductCategoryFilter(filter));
  };
  const onClose = (e) => {
    setDrawerOpen(false);
    dispatch(setProductCategoryFilter({}));
  };
  const handlenotification = () => {
    if (!notification) {
      setNotification(true);
    } else {
      setNotification(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout(() => navigate("/")));
    setMenuOpen(false);
  };

  return (
    <div className="search">
      {/* <div className="filter"    > */}
      <FormGroup className="filter">
        <div className="filterBlock">
          <h6 className="filterBlockTitle">{t("priceRange")}</h6>
          <div className="priceSlider">
            <span>
              {(filter?.price ? filter.price : [minPrice, maxPrice]).join("-")}
            </span>
            <Slider
              defaultValue={filter?.price || [minPrice, maxPrice]}
              onChangeCommitted={(e, value) => {
                setFilter({
                  ...filter,
                  price:
                    value[0] !== minPrice || value[1] !== maxPrice
                      ? value
                      : null,
                });
              }}
              max={maxPrice}
              min={minPrice}
              valueLabelDisplay="auto"
              sx={{ color: "var(--primary)" }}
            />
          </div>
        </div>
        <div className="searchWrapper">
          {/* <FormControl
              size="small"
              sx={{ minWidth: 50 }}
            >
              <Select
                autoWidth
                value={num}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label', }}
                InputLabelProps={{ shrink: false }}
                onChange={handleSelect}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
              </Select>
            </FormControl> */}

          <FormControl>
            <TextField
              id="search-bar"
              sx={{ background: "#f9f9f9" }}
              placeholder={`${t("Search")}`}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, maxWidth: 120 }}
          >
            <Select
              displayEmpty
              className="selectBorder"
              InputLabelProps={{ shrink: false }}
              autoWidth
              inputProps={{ "aria-label": "Without label" }}
              sx={{ background: "#f9f9f9" }}
              onChange={(e) => setArea(e.target.value)}
              value={area}
            >
              <MenuItem value="אזור">אזור</MenuItem>
              <MenuItem value="צפון "> צפון</MenuItem>
              <MenuItem value="גוש דן "> גוש דן</MenuItem>
              <MenuItem value="ירושלים"> ירושלים</MenuItem>
              <MenuItem value="דרום "> דרום</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1, maxWidth: 120 }}>
            <Select
              displayEmpty
              InputLabelProps={{ shrink: false }}
              autoWidth
              inputProps={{ "aria-label": "Without label" }}
              sx={{ background: "#f9f9f9", direction: "ltr" }}
              onChange={(e) => setCity(e.target.value)}
              value={city}
            >
              <MenuItem value="ישוב">ישוב</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, maxWidth: 120 }}>
            <Select
              displayEmpty
              InputLabelProps={{ shrink: false }}
              autoWidth
              inputProps={{ "aria-label": "Without label" }}
              sx={{ background: "#f9f9f9", direction: "ltr" }}
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <MenuItem value="קטגוריה">קטגוריה</MenuItem>
            </Select>
          </FormControl>
          {/* </div> */}

          {/* <div className="searchWrapper"> */}
          <Button
            variant="contained"
            // className="blueBtn"

            sx={{ m: 1, minHeight: 56, background: "var(--primary)", maxWidth: 120 }}
            size="large"
            onClick={onFilter}
          >
            {t("apply")}
          </Button>
        </div>
      </FormGroup>
    </div>
  );
};

export default Search;
