import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FormControl from "@mui/material/FormControl";
import { FormGroup, TextField } from '@mui/material';

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Button } from "@material-ui/core";
// import "../Dashboard.css";

const screenWidth = window.innerWidth;
let makeProductsPerPage = 0;
if (screenWidth > 991) {
  makeProductsPerPage = 12;
} else if (screenWidth > 767) {
  makeProductsPerPage = 8;
} else if (screenWidth > 500) {
  makeProductsPerPage = 6;
} else {
  makeProductsPerPage = 12;
}

export default function AllCoupons({ filterProducts }) {
  const [num, setNum] = useState(1);
  //   const [filterProducts, setFilterProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(makeProductsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentFilterProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleFavChange = () => {
    // let temp = [{ name: "test" }];
    // dispatch({
    //   type: ADD_TO_CART,
    //   payload: temp,
    // });
  };



  return (
    <>
      <ul className="product-Module">
        {filterProducts.length > 0
          ? currentFilterProducts.map((product) => (
            <>
              <li className="product-Module__list isLink">
                <div className="product-box">
                  <div
                    onClick={() => {
                      navigate(`/product/${product.id}`, {
                        state: { id: product.id },
                      });
                    }}
                    className="product-box__img"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    <div className="product-box__likeBtn">
                      <FavoriteBorderOutlinedIcon
                        onClick={() => handleFavChange()}
                      />
                    </div>

                  </div>
                  <div className="product-box__info">
                    <div className="product-box__infoTop">
                      <h6 className="product-box__brand">
                        {product.title}
                      </h6>
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
                        variant="outlined"
                        onClick={() => { }}
                      >
                        לרכישה{" "}
                      </Button>
                    </div>
                  </div>

                </div>
              </li>
            </>
          ))
          : t("No products")}
      </ul>
    </>
  );
}
