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
import Drawer from "@mui/material/Drawer";
import Slider from "@mui/material/Slider";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuItem, Select } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import LanguageSelect from "../language/languageSelect";
import { setGetTabbingValue, logout, setProductCategoryFilter } from "../../redux/actions-exporter";
import SearchResult from "../searchResult/SearchResult";
import widgetHelper from "../../helpers/widget"

import profile from "../../assets/icons/profile.svg";
// import groupChat from "../../assets/icons/group-chat.svg";
// import Vacant from "../../assets/icons/vacantLand.svg";
// import card from "../../assets/icons/cart.svg";
// import location from "../../assets/icons/location.svg";
import "./header.css";
// import search from "../../assets/images/search.png";
import Logo from "../../assets/images/logo.png";

const Header = ({ isMap, mapSearch }) => {
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

  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [stores, setStores] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [filterStores, setFilterStores] = useState([]);

  const productCategories = useSelector((state) => state.productCategories.originalProductCategories);
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
      const prices = []
      products.forEach(product => {
        if (product?.price) {
          prices.push(parseFloat(product.price))
        }
      })

      if (prices.length) {
        prices.sort((a, b) => a - b)
        setMinPrice(prices[0])
        setMaxPrice(prices[prices.length - 1])
      }
    }
  }, [products])

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
      navigate("/allvendors");
      dispatch(setGetTabbingValue(newValue));
    }
    if (newValue === 2) {
      dispatch(setGetTabbingValue(newValue));
      navigate("/categorylist");
    }
  };

  const closeMobileMenu = () => setClick(false);

  const onFilter = (e) => {
    console.log(filter)
    dispatch(setProductCategoryFilter(filter));
  }
  const onClose = (e) => {
    setDrawerOpen(false)
    dispatch(setProductCategoryFilter({}));
  }
  const handlenotification = () => {
    if (!notification) {
      setNotification(true);
    } else {
      setNotification(false);
    }
  };

  // const sizeList = [
  //   { size: "X", value: "x", id: 1 },
  //   { size: "S", value: "s", id: 2 },
  //   { size: "M", value: "m", id: 3 },
  //   { size: "L", value: "l", id: 4 },
  //   { size: "Xl", value: "xl", id: 5 },
  //   { size: "XXL", value: "xxl", id: 5 },
  // ];
  //
  // const colorList = [
  //   { code: "#ffffff", value: "white" },
  //   { code: "#c69c6d", value: "" },
  //   { code: "#846dc6", value: "" },
  //   { code: "#6dc684", value: "" },
  //   { code: "#e76d6d", value: "" },
  //   { code: "#c6c6c6", value: "" },
  // ];

  // const handleSizeChange = (item, i) => {};

  const handleLogout = () => {
    dispatch(logout(() => navigate("/")));
    setMenuOpen(false);
  };

  return (
    <div className="main">
      <div className={isMenuOpen ? "mainheader active-menu" : "mainheader"}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-3 col-2">
              <div className="headerLeft">
                <span className="userBlock-img" 
                  onClick={() => {
                    setValue(0);
                    dispatch(setGetTabbingValue(0));
                    navigate("/");
                  }}
                >
                  <img src={Logo} alt="img" className="img-fluid" />
                </span>
                {isMenuOpen ? (
                  <Drawer
                    anchor="left"
                    className="SideDrawer"
                    open={isMenuOpen}
                    onClose={() => setMenuOpen(false)}
                  >
                    <div className="SideDrawerHead">
                      <span
                        onClick={() => setMenuOpen(false)}
                        className="closeBtn"
                      >
                        <Clear />
                      </span>
                      <div className="menu">
                        <div className="menu-inner">
                          {user && (
                            <div className="menuHead">
                              <div className="menuUser">
                                {user?.profileImage && (
                                  <span className="menuUser-img">
                                    <img
                                      src={user?.profileImage}
                                      className="img-fluid"
                                      alt="My Awesome"
                                    />
                                  </span>
                                )}
                                <div className="menuUser-title">
                                  {(user?.firstName || "") +
                                    " " +
                                    (user?.lastName || "")}
                                </div>
                              </div>
                              <div
                                className="menuHead-btn"
                              // onClick={() => history.push("/")}
                              ></div>
                            </div>
                          )}
                          <ul className="menuList">
                            <li>
                              <img
                                src={profile}
                                className="menuList-img"
                                alt="My Awesome"
                              />
                              <Link
                                to="/registerbusiness"
                                className="nav-links"
                                onClick={closeMobileMenu}
                              >
                                {t("registerBusiness")}
                              </Link>
                            </li>
                            <li>
                              <img
                                src={profile}
                                className="menuList-img"
                                alt="My Awesome"
                              />
                              {/*<Link*/}
                              {/*  to="/userProfile"*/}
                              {/*  className="nav-links"*/}
                              {/*  onClick={closeMobileMenu}*/}
                              {/*>*/}
                              {/*  {t("businessProfile")}*/}
                              {/*</Link>*/}
                            </li>
                            {/*<li>*/}
                            {/*  <img*/}
                            {/*    src={profile}*/}
                            {/*    className="menuList-img"*/}
                            {/*    alt="My Awesome"*/}
                            {/*  />*/}
                            {/*  <Link*/}
                            {/*    to="/managedashboard"*/}
                            {/*    className="nav-links"*/}
                            {/*    onClick={closeMobileMenu}*/}
                            {/*  >*/}
                            {/*    {t("manageDashbord")}*/}
                            {/*  </Link>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*  <img*/}
                            {/*    src={search}*/}
                            {/*    className="menuList-img"*/}
                            {/*    alt="agent"*/}
                            {/*  />*/}
                            {/*  <Link*/}
                            {/*    to="/shops"*/}
                            {/*    className="nav-links"*/}
                            {/*    onClick={closeMobileMenu}*/}
                            {/*  >*/}
                            {/*    {t("searchForShop")}*/}
                            {/*  </Link>*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*  <img*/}
                            {/*    src={location}*/}
                            {/*    className="menuList-img"*/}
                            {/*    alt=""*/}
                            {/*  />*/}
                            {/*  {t("propertiesAroundme")}*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*  <StorefrontIcon className="menuList-img" />*/}
                            {/*  {t("marketplace")}*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*  <img*/}
                            {/*    src={groupChat}*/}
                            {/*    className="menuList-img"*/}
                            {/*    alt=""*/}
                            {/*  />*/}
                            {/*  {t("groupChats")}*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*  <img*/}
                            {/*    src={Vacant}*/}
                            {/*    className="menuList-img"*/}
                            {/*    alt="My Awesome"*/}
                            {/*  />*/}
                            {/*  {t("referralProgram")}*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*  <img*/}
                            {/*    src={profile}*/}
                            {/*    className="menuList-img"*/}
                            {/*    alt="My Awesome"*/}
                            {/*  />*/}
                            {/*  {t("Invitefriends")}*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*  <img*/}
                            {/*    src={groupChat}*/}
                            {/*    className="menuList-img"*/}
                            {/*    alt="My Awesome"*/}
                            {/*  />*/}
                            {/*  {t("orders")}*/}
                            {/*</li>*/}
                            {/*<li>*/}
                            {/*  <img*/}
                            {/*    src={card}*/}
                            {/*    className="menuList-img"*/}
                            {/*    alt="My Awesome"*/}
                            {/*  />*/}
                            {/*  {t("card")}*/}
                            {/*</li>*/}
                          </ul>
                        </div>
                        <div className="menuFooter">
                          {user && (
                            <button
                              className="btn-gray"
                              onClick={() => widgetHelper.open(() => navigate("/userprofile"))}
                            >
                              {t("myProfile")}
                            </button>
                          )}
                          {/*<button className="btn-blue">*/}
                          {/*  {t("chatWithBot")}*/}
                          {/*</button>*/}
                          <div className="menufooterBtns">
                            {user && (
                              <div
                                className="menufooterLink isLink"
                                onClick={handleLogout}
                              >
                                <LogoutIcon /> {t("logout")}{" "}
                              </div>
                            )}
                            {/*<div className="menufooterLink isLink">*/}
                            {/*  <SettingsIcon />*/}
                            {/*  {t("settings")}*/}
                            {/*</div>*/}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Drawer>
                ) : (
                  ""
                )}
                <Tabs
                  value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="disabled tabs example"
                  className="MainMenu"
                >
                  <Tab
                    label={t("home")}
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                  <Tab
                    label={t("Coupons")}
                    // onClick={() => {
                      // navigate("/category/3"), {
                      //   state: { id: category.id }
                      // }
                    // }}
                  />
                  <Tab
                    label={t("categories")}
                    onClick={() => {
                      navigate("/categorylist");
                    }}
                  />
                </Tabs>
              </div>
            </div>

            <div className="col-lg-9 col-10 text-right">
              <div className="headerRight">
                <Button className="dropBtn" onClick={() => widgetHelper.openMenu(() => setMenuOpen(true))}>
                  <MenuIcon />
                </Button>
                <Button
                  className="dropBtn d-none d-lg-flex"
                  onClick={() => setDrawerOpen(true)}
                >
                  <FilterAltIcon />
                </Button>
                {isDrawerOpen ? (
                  <Drawer
                    anchor="right"
                    className="SideDrawer"
                    open={isDrawerOpen}
                    disableRestoreFocus
                  // onClose={() => setDrawerOpen(false)}
                  >
                    <div className="SideDrawerHead">
                      <h6 className="SideDrawerTitle">{t("headerFilters")}</h6>
                      <span
                        onClick={() => onClose()}
                        className="closeBtn"
                      >
                        {" "}
                        <Clear />
                      </span>
                    </div>
                    {productCategories?.length && <div className="filterBlock">
                      <h6 className="filterBlockTitle">{t("category")}</h6>
                      <Select
                        labelId="product-category"
                        id="product-category"
                        value={filter?.id || ''}
                        label="category"
                        className="selectCategory"
                        onChange={e => setFilter({ ...filter, id: e.target.value })}
                      >
                        <MenuItem value="">{t('Not selected')}</MenuItem>
                        {productCategories.map((item) => <MenuItem value={item.id}>{item.title}</MenuItem>)}
                      </Select>
                    </div>}
                    <div className="filterBlock">
                      <h6 className="filterBlockTitle">{t("priceRange")}</h6>
                      <span>{(filter?.price ? filter.price : [minPrice, maxPrice]).join('-')}</span>
                      <Slider
                        getAriaLabel={() => "Price range"}
                        defaultValue={filter?.price || [minPrice, maxPrice]}
                        onChangeCommitted={(e, value) => {
                          setFilter({ ...filter, price: value[0] !== minPrice || value[1] !== maxPrice ? value : null })
                        }}
                        max={maxPrice}
                        min={minPrice}
                        valueLabelDisplay="auto"
                      />
                    </div>
                    {/*<div className="filterBlock">*/}
                    {/*  <h6 className="filterBlockTitle">{t("size")}</h6>*/}
                    {/*  <div className="filterBlockRow">*/}
                    {/*    {sizeList.map((item, i) => {*/}
                    {/*      return (*/}
                    {/*        <span*/}
                    {/*          className={isSizeSelected ? "active" : ""}*/}
                    {/*          onClick={() => handleSizeChange(item, i)}*/}
                    {/*        >*/}
                    {/*          {t(item.value)}*/}
                    {/*        </span>*/}
                    {/*      );*/}
                    {/*    })}*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    {/*<div className="filterBlock">*/}
                    {/*  <h6 className="filterBlockTitle">{t("color")}</h6>*/}
                    {/*  <div className="colorCode">*/}
                    {/*    {colorList.map((item, i) => {*/}
                    {/*      return (*/}
                    {/*        <span*/}
                    {/*          style={{*/}
                    {/*            background: item.code,*/}
                    {/*            borderColor: item.code,*/}
                    {/*          }}*/}
                    {/*        ></span>*/}
                    {/*      );*/}
                    {/*    })}*/}
                    {/*  </div>*/}
                    {/*</div>*/}
                    <div className="saveFilter">
                      <Button className="blueBtn" onClick={onFilter}>{t("apply")}</Button>
                    </div>
                  </Drawer>
                ) : (
                  ""
                )}

                <form
                  className={
                    isSearchOpen
                      ? "search-container d-none d-lg-block active-search"
                      : "search-container d-none d-lg-block"
                  }
                >
                  <div className="search-container__btn">
                    <SearchOutlinedIcon />
                  </div>
                  <input
                    type="text"
                    id="search-bar"
                    placeholder={`${t("Search")}`}
                    className="search-container__input"
                    onChange={(e) => setSearchText(e.target.value)}
                    onClick={openSearch}
                    value={searchText}
                  />
                  <div className="mic-container__btn">
                    <MicIcon />
                  </div>
                </form>
                <SearchResult
                  filterProducts={filterProducts}
                  filterStores={filterStores}
                  isMap={isMap}
                  mapSearch={mapSearch}
                />
                <Button
                  className="dropBtn d-none d-lg-flex d-xl-none"
                  onClick={() => {
                    if (isSearchOpen) setSearchOpen(false);
                    else setSearchOpen(true);
                  }}
                >
                  <SearchOutlinedIcon />
                </Button>
                {user && (
                  <>
                    <Button className="dropBtn">
                      <PersonOutline onClick={() => {
                        widgetHelper.openProfile(() => navigate("/userprofile"))
                      }} />
                    </Button>
                    <div className="notificationBlock">
                      <Button className="dropBtn" onClick={handlenotification}>
                        <NotificationsNoneIcon />
                        <span className="subCount">3</span>
                      </Button>
                      {notification ? (
                        <div className="notificationList">
                          <div className="chatMainBox">
                            <div className="chatMainBox__inner">
                              <div className="chatMainBox__img">
                                <img
                                  src={user}
                                  alt=""
                                  height={50}
                                  width={50}
                                  className="img-fluid"
                                />
                              </div>
                              <div className="chatMainBox__info">
                                <h4 className="chatMainBox__name">
                                  {t("chatbot")}
                                </h4>
                                <p className="chatMainBox__text">
                                  lorem ipsum dolor sir amet
                                </p>
                              </div>
                            </div>
                            <span className="chatMainBox__time">4pm</span>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </>
                )}

                {!user && (
                  <Button
                    onClick={() => widgetHelper.login(() => navigate("/login"))}
                    className="loginBtn d-lg-block "
                  >
                    {t("login")}
                  </Button>
                )}

                <div
                  className="mainheader__btn mainheader__btn--cart"
                  onClick={() => {
                    if (
                      window.location.pathname === "/company" ||
                      window.location.pathname === "/product" ||
                      window.location.pathname === "/bookingcart" ||
                      window.location.pathname === "/bookingcartdetail"
                    )
                      navigate("/bookingcart");
                    else navigate("/cart");
                  }}
                >
                  <ShoppingCartOutlinedIcon />
                  <span className="subCountRight">{cartCount || 0}</span>
                  {/* <span className="mainheader--cartNo">{cart.length}</span> */}
                </div>
                <div className="mainheader__btn mainheader__btn--cart">
                  <AccountBalanceWalletIcon
                    onClick={() => {
                      navigate("/wallet");
                    }}
                  />
                  <span className="subCountRight">3</span>
                  {/* <span className="mainheader--cartNo">{wallet.length}</span> */}
                </div>
                <div className="mainheader__btn mainheader__btn--cart d-none d-lg-flex">
                  <AddLocationAltIcon
                    onClick={() => {
                      navigate("/map");
                    }}
                  />
                </div>

                {/* {!user && (
                  <Button
                    variant="contained"
                    className="solidBtn d-none d-lg-block"
                    onClick={() => widgetHelper.register(() => navigate("/register"))}
                  >
                    {t("startForFree")}
                  </Button>
                )} */}
                {/* <LanguageSelect /> */}
                <div className="lanSelector">
                  <LanguageSelect />
                </div>
              </div>
            </div>
            <div className="col-12 d-flex d-lg-none">
              <div
                className={
                  subToggleMenu ? "mobileSearch activeSubMenu" : "mobileSearch "
                }
              >
                <form
                  className={
                    isSearchOpen
                      ? "search-container active-search"
                      : "search-container"
                  }
                >
                  <div className="search-container__btn">
                    <SearchOutlinedIcon />
                  </div>
                  <input
                    type="text"
                    id="search-bar"
                    placeholder={`${t("Search")}`}
                    className="search-container__input"
                    onChange={(e) => setSearchText(e.target.value)}
                    onClick={openSearch}
                    value={searchText}
                  />
                  <div className="mic-container__btn">
                    <MicIcon />
                  </div>
                </form>
                <div className="mainheader__btn mainheader__btn--cart d-flex d-lg-none">
                  <AddLocationAltIcon
                    onClick={() => {
                      navigate("/map");
                    }}
                  />
                </div>
                <Button
                  className="dropBtn d-flex d-lg-none"
                  onClick={() => setDrawerOpen(true)}
                >
                  <FilterAltIcon />
                </Button>
                <div
                  className="mainheader__btn mainheader__btn--cart d-flex d-lg-none"
                  onClick={() => {
                    if (subToggleMenu) setSubToggleMenu(false);
                    else setSubToggleMenu(true);
                  }}
                >
                  <span className="openMenu">
                    <MenuIcon />
                  </span>
                  <span className="closeMenu">
                    <CloseOutlinedIcon />
                  </span>
                </div>
                <div className="responsiveSubMenu">
                  <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="disabled tabs example"
                    className="MainMenu"
                  >
                    <Tab
                      label={t("home")}
                      onClick={() => {
                        navigate("/");
                      }}
                    />
                    <Tab
                      label={t("stores")}
                      onClick={() => {
                        navigate("/allvendors");
                      }}
                    />
                    <Tab
                      label={t("categories")}
                      onClick={() => {
                        navigate("/categorylist");
                      }}
                    />
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
