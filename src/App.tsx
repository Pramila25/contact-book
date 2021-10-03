import "./App.css";
import * as React from "react";
import ReactDOM from "react-dom";
import ContactsList from "./ContactsList";
import { ContactDetailType } from "./types";

import { useEffect, useState } from "react";
import AddContact from "./AddContact";
import { getAll, findMaxKey } from "./API/dataManipulationAPI";
import SearchList from "./SearchList";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";

function App() {
  const [updateContDetail, setUpdateContDetail] = useState({});
  const [contactList, setContactList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const onContactSelected = (selectedContact: ContactDetailType): any => {
    setShowAdd(true);
    setUpdateContDetail(selectedContact);
  };

  const onAddButtonClick = () => {
    setShowAdd(true);
    setUpdateContDetail({
      key: findMaxKey(),
      firstName: "",
      lastName: "",
      emails: [],
    });
  };

  const onFormSubmit = async () => {
    await setContactList(getAll());
  };
  const onSearchComplete = (searchList: ContactDetailType[]) => {
    console.log("EEEEEEEEEEEEEEEEEE ", searchList);
    setContactList(searchList);
  };

  useEffect(() => {
    setUpdateContDetail(updateContDetail);
  }, [updateContDetail]);

  useEffect(() => {
    findMaxKey(true);
    setContactList(getAll());
  }, []);

  return (
    <>
      <Container className="contStyle" fluid="md">
        <Row>
          <Col xs={1}></Col>
          <Col xs={3}>
            <Row>
              <Col xs={8}>
                <h2>Contacts</h2>
              </Col>
              <Col>
                <Button
                  className="invBt bg-transparent"
                  onClick={() => onAddButtonClick()}
                >
                  <PlusCircleFill color="#7797C8" size={40} />
                </Button>
              </Col>
            </Row>
          </Col>
          <Col className="contBackgrnd"></Col>
        </Row>
        <Row>
          <Col xs={1}></Col>
          <Col xs={3}>
            <SearchList onSearchComplete={onSearchComplete}></SearchList>
            <ContactsList
              contact={contactList}
              onSelectFn={onContactSelected}
            ></ContactsList>
          </Col>
          <Col className="contBackgrnd">
            {showAdd ? (
              <AddContact
                contactDet={updateContDetail}
                onFormSubmit={onFormSubmit}
              ></AddContact>
            ) : null}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
