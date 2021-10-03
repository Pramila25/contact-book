import * as React from "react";
import ReactDOM from "react-dom";
import ListGroup from "react-bootstrap/ListGroup";

import { useState, MouseEventHandler } from "react";

import { ContactDetailType } from "./types";
import ContactDetail from "./ContactDetail";

interface contactDtl {
  contact: ContactDetailType[];
  onSelectFn: (contact: ContactDetailType) => any;
}
function ContactsList(props: contactDtl) {
  const onContactSelected = () => {
  };
  return (
    <ListGroup
      className="scrollbar scrollbar-primary"
      style={{ overflowY: "scroll" }}
    >
      {props.contact.length > 0
        ? props.contact.map((item) => {
            return (
              <ContactDetail
                contact={item}
                onSelectFn={props.onSelectFn}
              ></ContactDetail>
            );
          })
        : null}
    </ListGroup>
  );
}

export default ContactsList;
