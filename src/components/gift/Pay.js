import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";

import { sendGift } from "../../redux/actions-exporter";

import "./Pay.css";

function Pay({ reciever }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const sendGiftError = useSelector((state) => state.user.sendGiftError);

  let newCard;
  const cardChange = (e) => {
    newCard = e.target.value;
  };

  let newExp;
  const expChange = (e) => {
    newExp = e.target.value;
  };

  let newCVV;
  const cvvChange = (e) => {
    newCVV = e.target.value;
  };

  const recieverChangeApprove = (e) => {
    const finalData = { ...reciever, card: newCard, exp: newExp, cvv: newCVV };

    e.preventDefault();

    finalData.getters = finalData.getters
      .filter((getter) => getter.email)
      .map((getter) => getter.email);

    dispatch(
      sendGift(
        finalData,
        () => {
          toast.success("Gift(s) has been successfully sent");

          navigate("/gift/3", {
            state: { product: reciever.product },
          });
        },
        () => toast.error(sendGiftError.response.data.message)
      )
    );
  };

  return (
    <div className="for">
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>מספר כרטיס</Form.Label>
          <Form.Control
            onChange={cardChange}
            type=""
            placeholder="1111 2222 3333 5555"
          />
          <Form.Text className="text-muted">
            {/* We'll never share your email with anyone else. */}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>תוקף הכרטיס</Form.Label>
          <Form.Control
            onChange={expChange}
            className=""
            type="text"
            placeholder="MM/YY"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>CVV</Form.Label>
          <Form.Control
            onChange={cvvChange}
            className=""
            type="number"
            placeholder="XXX"
          />
        </Form.Group>
        <div className="btnDiv">
          <Button className="payAmount" variant="" disabled>
            סך הכל לתשלום
            <span> {reciever.amount}$</span>
          </Button>
          <Button
            onClick={recieverChangeApprove}
            className="payBtn"
            variant="info"
            type="submit"
          >
            שלם
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Pay;
