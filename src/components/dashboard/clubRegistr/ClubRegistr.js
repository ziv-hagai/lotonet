import React from "react";
import Form from "react-bootstrap/Form";
import Button from 'react-bootstrap/Button';

import './ClubRegistr.css'

import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { FaTiktok } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { AiFillPhone } from 'react-icons/ai';
import { HiMail } from 'react-icons/hi';

import mall1 from "../../../assets/images/mall1.jpg";

const ClubRegistr = () => {
  return (
    <>

      <footer className="text-center text-lg-start bg-light text-muted clubRegister" >

        

        <section className="">
          <div className="container text-center text-md-start mt-5 ">
            <div className="row mt-3 " style={{flexWrap: 'wrap-reverse'}}>
              <div className="col-md-4 col-lg-3 col-xl-2 mx-auto mb-4 ">
              <section class="d-flex justify-content-around justify-content-lg-around p-4 mx-5 border-bottom">
                <a href="" className="me-4 text-reset">
                  <FaFacebookF />
                </a>
                {/* <a href="" className="me-4 text-reset">
                  <AiOutlineTwitter />
                </a> */}
                <a href="" className="me-4 text-reset ml-4 mr-4">
                  <AiFillInstagram />
                </a>
                <a href="" className="me-4 text-reset">
                  <AiFillLinkedin />
                </a>
                {/* <a href="" className="me-4 text-reset">
                  <FaTiktok />
                </a> */}
              </section>
                <h6 className="text-uppercase fw-bold mb-4">
                  קישורים שימושיים
                </h6>
                <p>
                  <a href="#!" className="text-reset">פרטיות</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">תנאי שימוש</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">אודות</a>
                </p>
                <p>
                  <a href="#!" className="text-reset">נגישות</a>
                </p>
              </div>

              {/* <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4"> */}
              <div className="d-flex flex-column justify-content-around col-md-8 col-lg-7 col-xl-6 mx-auto " >
                <img className="ClubRegistrImg" src={mall1} />
                <div className="ClubRegistrContent" >
                  <h1>הרשמה למועדון לקוחות</h1>
                  <p className="text-right">
                    לקוחות יקרים, בואו להיות חלק מהמועדון "מולקלאב", מועדון לעשרות קניונים בפריסה ארצית. תקבלו מבצעים שווים המתאימים לכם, תוכן, מידע על מוצרים חדשים, אירועים בקניונים וכו'.
                  </p>
                  <Form className="d-flex flex-row justify-content-center p-3 ">
                    <Form.Group className="mb-3 " controlId="formBasicEmail">
                      {/* <Form.Label>אי-מייל</Form.Label> */}
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="אימייל"
                      />
                    </Form.Group>
                    <div className="px-2  mb-3">
                      <Button type="submit">
                        הרשמה
                      </Button>
                    </div>
                  </Form>
                </div>
              </div>

              {/* </div> */}
            </div>
          </div>
        </section>

        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          © 2022 Copyright:
          <a className="text-reset fw-bold" href="#">MallClub</a>
        </div>
      </footer>
    </>
  );
};

export default ClubRegistr;