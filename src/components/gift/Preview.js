import Button from "react-bootstrap/Button";

import ts from "../../assets/images/shovar.jpg";
import "./Preview.css";

function Preview({ reciever }) {
  // let newAmount;
  const amountChange = (e) => {
    // newAmount = e.target.value;
  };

  const recieverChangeApprove = (e) => {
    const btn = document.querySelector(".forAmountTextChangeBtn");
    const input = document.querySelector(".forAmountTextChangeBtnDiv");
    input.style.display = "none";
    btn.style.display = "block";
  };

  return (
    <div className="preview">
      <div className="forAmount">
        <div className="forAmountBg">
          <div className="forAmountImgDiv">
            <img
              className="forAmountImg"
              src={reciever?.product?.image || ts}
              alt="forAmountImg"
            />
          </div>
          <div className="forAmountText">
            {/* <div className="forAmountTextShekel">120$</div> */}
            <div className="forAmountTextChange">
              <div className="forAmountTextChangeH">
                שובר כספי בסך
                <span> {reciever?.amount || 0}$</span>
              </div>
              <div
                onClick={(e) => {
                  e.target.style.display = "none";
                  const input = document.querySelector(
                    ".forAmountTextChangeBtnDiv"
                  );
                  input.style.display = "flex";
                }}
                className="forAmountTextChangeBtn"
              >
                שינוי סכום המתנה
              </div>
              <div className="forAmountTextChangeBtnDiv">
                <input
                  defaultValue={reciever?.amount || 0}
                  onChange={amountChange}
                  placeholder="הכנס סכום"
                  className="forAmountTextChangeBtnInput"
                  type="number"
                />
                <Button
                  onClick={recieverChangeApprove}
                  variant="info"
                  type="submit"
                >
                  אישור
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
