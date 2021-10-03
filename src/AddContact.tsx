import { group } from "console";
import React, { useEffect, useState } from "react";
import validator from "validator";

import { Form, Button, Row, Col, Container, InputGroup } from "react-bootstrap";
import { ContactDetailType } from "./types";
import "./App.css";
import {
  addContact,
  updateContact,
  deleteContact,
} from "./API/dataManipulationAPI";
import { XCircleFill } from "react-bootstrap-icons";

function AddContact({ contactDet, onFormSubmit }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emails, setEmails] = useState([]);
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const addDetails = (e) => {
    e.preventDefault();
    let resp: boolean = false;
    if (contactDet) {
      resp = updateContact({
        key: contactDet.key,
        firstName,
        lastName,
        emails,
      });
    } else {
      resp = addContact({
        key: contactDet.key,
        firstName,
        lastName,
        emails,
      });
    }
    if (!!resp) onFormSubmit();
  };
  const handleCancel = () => {
    setFirstName("");
    setLastName("");
    setEmails([]);
    setNewEmail("");
    onFormSubmit();
  };
  const handleDeleteContact = (e) => {
    if (contactDet) {
      e.preventDefault();
      deleteContact(contactDet);
      handleCancel();
    }
  };
  const appendEmail = (e) => {
    e.preventDefault();

    if (!validator.isEmail(newEmail)) {
      setEmailError("Enter valid Email!");
    } else {
      if (newEmail.length > 0) {
        if (emails && emails.length > 0) setEmails([...emails, newEmail]);
        else setEmails([newEmail]);
        setNewEmail("");
      }
    }
  };
  const deleteSelected = (e, item: string) => {
    e.preventDefault();
    const emailsCopy = emails.filter((email) => {
      return item !== email;
    });
    setEmails([...emailsCopy]);
  };
  useEffect(() => {
    if (contactDet) {
      setFirstName(contactDet.firstName);
      setLastName(contactDet.lastName);
      setEmails(contactDet.emails);
      setNewEmail("");
    }
  }, [contactDet]);

  return (
    <Form onSubmit={(e) => addDetails(e)}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Row>
          <Col>
            <Form.Label className="formLabel" sm="2">
              First Name
            </Form.Label>
          </Col>
          <Col>
            <Form.Label className="formLabel" sm="2">
              Last Name
            </Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              required
              type="text"
              placeholder="Enter FirstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Control
              required
              type="text"
              placeholder="Enter LastName"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row style={{ height: "50px" }}></Row>
        <Row>
          <Col>
            <Form.Label className="formLabel" sm="1">
              Emails
            </Form.Label>
          </Col>
        </Row>
        <Row>
          <Col>
            {emails
              ? emails.map((item) => {
                  return (
                    <div>
                      <div className="parent">
                        <Form.Text className="child inline-block-child">
                          {item}
                        </Form.Text>
                        &nbsp; &nbsp;
                        <div className="child inline-block-child">
                          <Button
                            className="invBt bg-transparent"
                            onClick={(e) => deleteSelected(e, item)}
                          >
                            <XCircleFill color="#7797C8" size={20} />
                          </Button>
                        </div>
                      </div>
                      <br />
                    </div>
                  );
                })
              : null}
          </Col>
        </Row>
      </Form.Group>
      <Row>
        <Col>
          <Form.Control
            type="text"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => {
              setEmailError("");
              setNewEmail(e.target.value);
            }}
          />
        </Col>
        <Col>
          <Button variant="primary" onClick={(e) => appendEmail(e)}>
            Add Email
          </Button>
        </Col>
      </Row>
      <Row>
        {" "}
        <pre>
          <span
            style={{
              fontWeight: "bold",
              color: "red",
            }}
          >
            {emailError}
          </span>
        </pre>
      </Row>

      <div className="actionEl">
        <Row>
          <Col xs={3}>
            <Button variant="primary" type="submit">
              Save Contact
            </Button>
          </Col>
          <Col xs={2}>
            <Button
              variant="outline-info"
              onClick={(e) => {
                handleCancel();
              }}
            >
              Cancel
            </Button>
          </Col>
          <Col xs={4}></Col>
          <Col xs={3}>
            <Button
              variant="outline-danger"
              onClick={(e) => {
                handleDeleteContact(e);
              }}
            >
              Delete Contact
            </Button>
          </Col>
        </Row>
      </div>
    </Form>
  );
}

export default AddContact;
