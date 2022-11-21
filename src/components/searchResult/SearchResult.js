import { useNavigate } from "react-router-dom";

import "./SearchResult.css";

const SearchReults = ({ filterProducts, filterStores, isMap, mapSearch }) => {

  const navigate = useNavigate();

  window.onload = () => {
    document.onclick = function (e) {
      if (e.target.className !== "menuSearch" && e.target.id !== "search-bar") {
        document.querySelector(".menuSearch").style.display = "none";
      }
    };
  };
  // console.log(isMap);
  return (
    <div className="menuSearch">
      <div className="menuSearchSection">
        <div className="menuSearchSectionLink">מוצרים</div>
        <div className="MenuSearchItemsDiv">
          {filterProducts.map((el, i) => {
            return (
              <div

                onClick={() => {
                  isMap ?
                    // console.log(el)
                    mapSearch(el)
                    :
                    navigate(`/product/${el.id
                      }`, {
                      state: { id: el.id },
                    });
                }}

                className="menuSearchItem"
                key={i}
              >
                <img alt="" className="menuSearchItemImg" src={el.image} />
                <div className="menuSearchItemText">{el.title}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="menuSearchSection">
        <div to={"#"} className="menuSearchSectionLink">
          חנויות
          {/* {header} */}
        </div>
        <div className="MenuSearchItemsDiv">
          {filterStores.map((el, i) => {
            return (
              <div
                onClick={() => {
                  isMap ?
                    // console.log(el)
                    mapSearch(el)
                    :
                    navigate(`/ vendor / ${el.id}`, {
                      state: { id: el.id },
                    });
                }}
                className="menuSearchItem"
                key={i}
              >
                <img alt="" className="menuSearchItemImg" src={el.image} />
                <div className="menuSearchItemText">{el.title}</div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div to="#" className="menuSearchMore"      >
        לעוד תוצאות
      </div> */}
    </div>
  );
};

export default SearchReults;
