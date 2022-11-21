import "./How.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Person from "./Person";
import { useEffect, useState } from "react";
//import FilePresentIcon from "@mui/icons-material/FilePresent";
import excel from "../../assets/images/excel.jpg";

// import AddBoxIcon from '@mui/icons-material/AddBox';
// import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
// import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
// import EmailIcon from '@mui/icons-material/Email';
// import PrintIcon from '@mui/icons-material/Print';

function How({ reciever }) {
  const [getters, setGetters] = useState([{ id: 0 }]);
  const [persons, setPersons] = useState([
    <Person key={0} id={0} getters={getters} setGetters={setGetters} />,
  ]);
  const navigate = useNavigate();
  let today = new Date();
  let newDate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  let newTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleAddPerson = (e) => {
    e.preventDefault();
    setGetters([...getters, { id: persons.length }]);
  };

  const handleDeletePerson = (e) => {
    e.preventDefault();
    let newGetters = [...getters];
    newGetters.pop();
    setGetters(newGetters);
  };

  useEffect(() => {
    let newPersons = persons.map((item, index) => (
      <Person
        key={index}
        id={index}
        getters={getters}
        setGetters={setGetters}
      />
    ));

    if (getters.length > persons.length) {
      setPersons([
        ...newPersons,
        <Person
          key={persons.length}
          id={persons.length}
          getters={getters}
          setGetters={setGetters}
        />,
      ]);
    } else if (getters.length < persons.length) {
      newPersons.pop();
      setPersons(newPersons);
    }
  }, [getters]); //eslint-disable-line

  const isLater = (e) => {
    const date = document.querySelector(".date");
    e.target.value === "later"
      ? (date.style.display = "flex")
      : (date.style.display = "none");
  };

  const dateChange = (e) => {
    newDate = e.target.value;
  };

  const blessChange = (e) => {
    newTime = e.target.value;
  };

  const recieverChangeApprove = () => {
    navigate("/gift/2", {
      state: {
        product: reciever.product,
        reciever: { ...reciever, date: newDate, time: newTime, getters },
      },
    });
  };

  return (
    <div className="for">
      <Form className="form">
        <Form.Label>מתי לשלוח?</Form.Label>
        <Form.Group
          className="mb-3 when"
          controlId="formBasicCheckbox"
          onChange={isLater}
        >
          <Form.Check
            name="group1"
            id="inline-radio 1"
            inline
            type="radio"
            label="עכשיו"
            value="now"
            defaultChecked="true"
          />
          <Form.Check
            name="group1"
            id="inline-radio 2"
            inline
            type="radio"
            label="בתאריך -"
            value="later"
          />
        </Form.Group>
        <Form.Group className="mb-3 date" controlId="formBasicPassword">
          <Form.Control
            onChange={dateChange}
            type="date"
            placeholder="תאריך..."
          />
          <Form.Control
            onChange={blessChange}
            type="time"
            placeholder="שעה..."
          />
        </Form.Group>

        <Form.Group className="mb-3 file" controlId="formBasicPassword">
          <img src={excel} className="excelImg" alt="excelImg" />
          <Form.Label>צרף רשימה באקסל</Form.Label>
          {/* <FilePresentIcon /> */}
          <Form.Control onChange={dateChange} type="file" />
        </Form.Group>
        <Form.Group className="mb-3 getters" controlId="formBasicPassword">
          {persons}
        </Form.Group>
        <Form.Group className="mb-3 buttons" controlId="formBasicPassword">
          <Button variant="light" onClick={handleAddPerson} id="plus">
            +
          </Button>
          <Button variant="light" onClick={handleDeletePerson} id="minus">
            -
          </Button>
          <Button onClick={recieverChangeApprove} variant="info">
            המשך
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

export default How;
