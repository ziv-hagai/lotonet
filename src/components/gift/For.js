import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./For.css";

function For({ reciever }) {
  const navigate = useNavigate();

  let newBless;
  const blessChange = (e) => {
    newBless = e.target.value;
  };

  let newSenderName;
  const senderNameChange = (e) => {
    newSenderName = e.target.value;
  };
  const recieverChangeApprove = () => {
    navigate("/gift/1", {
      state: {
        product: reciever.product,
        reciever: { ...reciever, senderName: newSenderName, bless: newBless },
      },
    });
  };

  return (
    <div className="for">
      <Form className="form">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>שם שולח המתנה</Form.Label>
          <Form.Control
            onChange={senderNameChange}
            type="text"
            placeholder="שם..."
          />
          <Form.Text className="text-muted">
            {/* We'll never share your email with anyone else. */}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ברכה</Form.Label>
          <Form.Control
            onChange={blessChange}
            className="bless"
            type="text"
            placeholder="מזל טוב..."
          />
        </Form.Group>
        <Button onClick={recieverChangeApprove} variant="info">
          המשך
        </Button>
      </Form>
    </div>
  );
}

export default For;
