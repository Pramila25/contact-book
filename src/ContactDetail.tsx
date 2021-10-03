import * as React from "react";
import ReactDOM from "react-dom";

import { useState } from "react";

import { ContactDetailType } from "./types";
import { ListGroupItem } from "react-bootstrap";

interface contactDtl {
  contact: ContactDetailType;
  onSelectFn: (contact: ContactDetailType) => any;
}
function ContactDetail(props: contactDtl) {
  const onContactMouseOvered = () => {};
  return (
    <ListGroupItem 
      style={{ borderColor: "transparent" }}
      key={props.contact.key}
      action
      onClick={() => props.onSelectFn(props.contact)}
    >
      {props.contact.firstName}&nbsp;{props.contact.lastName}
    </ListGroupItem>
  );
}

export default ContactDetail;
