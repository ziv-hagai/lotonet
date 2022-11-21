import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

function Person({ id, setGetters, getters }) {
  const [disabled, setDisabled] = useState(false);
  const [getter, setGetter] = useState({});

  const approve = (e) => {
    let newGetters = [...getters];
    e.preventDefault();
    if (!disabled) {
      newGetters[id].name = getter.name;
      newGetters[id].email = getter.email;
      // newGetters[id].phone = getter.phone;

      setGetters(newGetters);
    }
    setDisabled(!disabled);
  };

  const phoneChange = (e) => {
    e.preventDefault();
    let newGetter = { ...getter };
    // newGetter.phone = e.target.value;
    newGetter.email = e.target.value;
    setGetter({ ...newGetter });
  };

  const getNameChange = (e) => {
    e.preventDefault();
    let newGetter = { ...getter };
    newGetter.name = e.target.value;
    setGetter({ ...newGetter });
  };

  return (
    <div className="person">
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{`נייד מקבל ${id + 1}`}</Form.Label>
        <Form.Control
          onChange={phoneChange}
          type="email"
          placeholder="נייד..."
          id={`${id}`}
          disabled={disabled}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{`שם מקבל ${id + 1}`}</Form.Label>
        <Form.Control
          onChange={getNameChange}
          type="text"
          placeholder="שם..."
          id={`${id}`}
          disabled={disabled}
        />
      </Form.Group>
      <Form.Group className="mb-3 approve" controlId="formBasicPassword">
        <Button variant="light" id="approve" onClick={approve}>
          {disabled ? "עריכה" : "אישור"}
        </Button>
      </Form.Group>
    </div>
  );
}

export default Person;
