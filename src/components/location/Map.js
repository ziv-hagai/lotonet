import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  getMerchants,
  getProductCategories,
} from "../../redux/actions-exporter";
//dependencies
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import GoogleMapReact from "google-map-react";

//icon
import { ReactComponent as Grid } from "../../assets/icons/grid.svg";
import { ReactComponent as List } from "../../assets/icons/list.svg";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import FilterListIcon from "@mui/icons-material/FilterList";
import StoreIcon from "@mui/icons-material/Store";
import { BsShop } from 'react-icons/bs';
import { TbShirt } from 'react-icons/tb';
import { TbBuildingSkyscraper } from 'react-icons/tb';
import { FaRegTimesCircle } from 'react-icons/fa';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import ShopIcon from "@mui/icons-material/Shop";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { ReactComponent as LocationMap } from "../../assets/icons/locationMap.svg";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

//images
import skrt from "../../assets/images/skrt.jpg";
import Saree2 from "../../assets/images/saree2.jpg";
import jns from "../../assets/images/jns.jpg";
import shop from "../../assets/images/shop.jpg";
import mall1 from "../../assets/images/mall1.jpg";
import brownhorse2 from "../../assets/images/brownhorse2.jpg";

//css
import "./map.css";
//component
import Header from "../header/Header";
import Dashboard from "../dashboard/Dashboard";
import Marker from "./Marker";

// import { InfoWindow } from "@react-google-maps/api";

const getMapOptions = () => {
  return {
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: true,
    clickableIcons: false,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
    ],
  };
};

const defaultCenter = {
  lng: 34.809185,
  lat: 32.1040256,
};

function Map() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [center, setCenter] = useState(defaultCenter);
  const OpenSidebar = () => setClick(!click);
  const [click, setClick] = useState(true);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [selectedMap, setSelectedMap] = useState({});
  // eslint-disable-next-line
  const [activeMarker, setActiveMarker] = useState();
  // eslint-disable-next-line
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("shop");
  const [filterMap, setFilterMap] = useState([]);
  const [category, setCategory] = useState([]);
  // get products
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);

  const categories = useSelector(
    (state) => state.productCategories.productCategories
  );
  const merchants = useSelector((state) => state.merchant.merchants);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMerchants());
    dispatch(getProductCategories());
  }, [dispatch]);

  //  search
  useEffect(() => {
    if (categories.length) {
      // console.log(categories);
      const prepareProduct = categories.reduce(
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

      let addLocation = prepareProduct.map(product => {
        return {
          ...product,
          latitude:
            merchants.find((merchant) => merchant.id === product.merchantId
            )?.latitude || null,
          longitude:
            merchants.find((merchant) => merchant.id === product.merchantId
            )?.longitude || null,
          city:
            merchants.find((merchant) => merchant.id === product.merchantId
            )?.city || null,
          address:
            merchants.find((merchant) => merchant.id === product.merchantId
            )?.address || null,
          store:
            merchants.find((merchant) => merchant.id === product.merchantId
            )?.title || null,
        }
      })

      addLocation = addLocation.filter((v, i, a) => a.findIndex(v2 => (v2.id === v.id)) === i)
      // console.log(addLocation);
      setProducts(addLocation);
      setStores(merchants);
    }
  }, [categories]); // eslint-disable-line

  useEffect(() => {

    setCategory(stores);
    setFilterMap(stores);
  }, [stores, products]);

  const handleClickOpen = (p) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setCenter({})
    }
    else {
      setShowingInfoWindow(true);
      setSelectedMap(p);
      setOpen(true);
      setActiveMarker(null);
      setCenter({})
      setCenter({ lat: p.longitude, lng: p.latitude })
    }
  };

  const handleChange = (newValue) => {
    if (newValue === "mall") {
      setType("mall")

      setFilterMap([]);
    } else if (newValue === "shop") {

      setFilterMap(stores);
      setType("shop")
    } else if (newValue === "product") {

      setFilterMap(products);
      setType("product")
    } else {
      setFilterMap(category);
    }
  };

  const mapSearch = (result) => {
    let found = {}
    if (result.merchantId) {
      found = products.find((item) => item.id === result.id);
      setFilterMap(products);
      setType("product");
    } else {

      found = stores.find((item) => item.id === result.id);
      setFilterMap(stores);
      setType("shop");
    }
    setCenter({ lat: found.longitude, lng: found.latitude })
  }


  // console.log(filterMap.filter((item) => item.title == "Bigelectric"));
  // console.log(filterMap);
  return (
    <>
      <Header isMap={true} mapSearch={mapSearch} />
      <div className={click ? "sidebarTamplate activeTabs" : "sidebarTamplate"}>
        <div className="sidebarModule">
          <Dashboard />
        </div>
        {/* <div className="mobilePageTabs">
          <div onClick={OpenSidebar} className="MapTab">
            <LocationOnOutlinedIcon /> {t("Map View")}
          </div>
          <div onClick={OpenSidebar} className="ListTab">
            <AiOutlineUnorderedList /> {t("List View")}
          </div>
          <div>
            <TurnedInNotIcon /> {t("Save Search")}
          </div>
        </div> */}
        <div className="rightModule">
          <div className="mapFilter">
            <ToggleButtonGroup
              aria-label="text alignment"
              className="mapFilterGroup"
              color="primary"
              value={type}
              exclusive
            // onChange={handleToggle}
            >
              {/* <ToggleButton
                aria-label="left aligned"
                onClick={() => handleChange("all")}
              >
                {t("Whats Nearby:")}
                {t("Whats Nearby:")}
                <Tooltip title="All">
                  <FilterListIcon />
                </Tooltip>
              </ToggleButton> */}

              <ToggleButton
                aria-label="left aligned"
                onClick={() => handleChange("product")}
                selectedColor='grey'
                value="product"
              >
                <Tooltip title="Product">
                  <TbShirt />
                </Tooltip>
              </ToggleButton>

              <ToggleButton
                aria-label="centered"
                onClick={() => handleChange("shop")}
                value="shop"
              >
                <Tooltip title="Shop">
                  <BsShop />
                </Tooltip>
              </ToggleButton>
              <ToggleButton
                aria-label="justified"
                onClick={() => handleChange("mall")}
                value="mall"
              >
                <Tooltip title="Mall">
                  <TbBuildingSkyscraper />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>

            {/* <ToggleButtonGroup
              aria-label="text alignment"
              className="mapFilterGroup"
            >
              <ToggleButton value="center" aria-label="centered">
                <SearchOutlinedIcon />
                {t("Search")}
              </ToggleButton>
            </ToggleButtonGroup> */}

            <ToggleButtonGroup
              aria-label="text alignment"
              className="mapFilterGroup"
            >
              {/* <ToggleButton value="left" aria-label="left aligned">
                <Grid />
                Grid
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <List />
                List
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <LocationMap />
                Map
              </ToggleButton> */}
              <ToggleButton
                onClick={() => navigate('/')}
                className='outMap'
                value="center"
                aria-label="centered"
              >
                <FaRegTimesCircle style={{ margin: '0' }} />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className="mainMap">
            <GoogleMapReact
              bootstrapURLKeys={{
                // key: process?.env?.REACT_APP_GOOGLE_MAP_API_KEY,
              }}
              center={center}
              defaultZoom={12}
              options={getMapOptions}
              onDrag={() => setCenter({})}

            >
              {/* {console.log(filterMap)} */}
              {filterMap.length > 0 &&
                filterMap.map((item) => {
                  return (
                    <Marker
                      // onClick={handleOpen}
                      openInfoWindow={() => handleClickOpen(item)}
                      lat={item.longitude}
                      lng={item.latitude}
                      image={item.image}
                      data={item}
                      selectedMap={selectedMap}
                      show={showingInfoWindow}
                      type={type}
                    ></Marker>
                  );
                })}
            </GoogleMapReact>
          </div>
        </div>
      </div>
    </>
  );
}

export default Map;