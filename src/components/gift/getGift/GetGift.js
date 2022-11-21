import "./GetGift.css";

import { useNavigate } from "react-router-dom";
//import gift from "../../../assets/images/giftcard.jpg";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function GetGift() {
  const navigate = useNavigate();

  return (
    <div className="getGift">
      {/* <img src={gift} /> */}
      <Form className="form getGiftForm">
        <Form.Group
          className="mb-3 getGiftFormGroup"
          controlId="formBasicPassword"
        >
          <Form.Label>קבלת שובר</Form.Label>
          <Form.Control type="tel" placeholder="הכנס את מספר הנייד שלך" />
        </Form.Group>
        <Button
          onClick={() => {
            navigate("/wallet");
          }}
          variant="info"
        >
          המשך
        </Button>
      </Form>
    </div>
  );
}

export default GetGift;
