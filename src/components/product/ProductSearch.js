import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Slider } from "@material-ui/core";
import { Button } from "@material-ui/core";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormGroup, TextField } from '@mui/material';

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setGetTabbingValue, logout, setProductCategoryFilter } from "../../redux/actions-exporter";

import "./ProductDetails.css";


const ProductSearch = ({ isMap, mapSearch }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { tabbingValue } = useSelector((state) => state.tabbing);

  const [filter, setFilter] = useState({});
  const [area, setArea] = useState("אזור");
  const [kosher, setKosher] = useState("כשרות");
  const [category, setCategory] = useState("קטגוריה");
  const [isPop, setIsPop] = useState(true);

  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [stores, setStores] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [filterStores, setFilterStores] = useState([]);

  const productCategories = useSelector((state) => state.productCategories.originalProductCategories);
  const merchants = useSelector((state) => state.merchant.merchants);

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

  const onFilter = (e) => {
    console.log(filter)
    dispatch(setProductCategoryFilter(filter));
  }

  return (

    <div className="search-product"    >
      <FormGroup className="filter">


        <div className="searchWrapper">

          <FormControl      >
            <TextField
              id="search-bar"
              sx={{ background: "#f9f9f9" }}
              placeholder={`${t("Search")}`}
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </FormControl>

          <FormControl
            sx={{ m: 1, minWidth: 120 }}
          >
            <Select
              displayEmpty
              InputLabelProps={{ shrink: false }}
              autoWidth
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ background: "#f9f9f9" }}
              onChange={(e) => setArea(e.target.value)
              }
              value={area}
            >
              <MenuItem value="אזור">אזור</MenuItem>
              <MenuItem value="צפון "> צפון</MenuItem>
              <MenuItem value="גוש דן "> גוש דן</MenuItem>
              <MenuItem value="ירושלים">  ירושלים</MenuItem>
              <MenuItem value="דרום "> דרום</MenuItem>

            </Select>
          </FormControl>

          <FormControl
            sx={{ m: 1, minWidth: 120 }}         >
            <Select
              displayEmpty
              InputLabelProps={{ shrink: false }}
              autoWidth
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ background: "#f9f9f9", direction: "ltr" }}
              onChange={(e) => setKosher(e.target.value)
              }
              value={kosher}
            >
              <MenuItem value="כשרות">כשרות</MenuItem>

            </Select>
          </FormControl>
          <FormControl
            sx={{ m: 1, minWidth: 120 }}         >
            <Select
              displayEmpty
              InputLabelProps={{ shrink: false }}
              autoWidth
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{ background: "#f9f9f9", direction: "ltr" }}
              onChange={(e) => setCategory(e.target.value)
              }
              value={category}
            >
              <MenuItem value="קטגוריה">קטגוריה</MenuItem>

            </Select>
          </FormControl>
        </div>



        <div className="searchWrapper"        >
          <Button
            variant="outlined"

            sx={{ m: 1, minHeight: 56 }}
            size="large"
            onClick={() => setIsPop(!isPop)}
          >
            {"לפי סדר" + " "}
            {isPop ? "פופולריות " : " א-ב"}
          </Button>
        </div>
        <div className="searchWrapper"        >
          <Button
            variant="contained"

            sx={{ m: 1, minHeight: 56, background: "var(--primary)" }}
            size="large"
          // onClick={onFilter}
          >
            {t("apply")}
          </Button>
        </div>
      </FormGroup>

    </div >
  );
};

export default ProductSearch;
