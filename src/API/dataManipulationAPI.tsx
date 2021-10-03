import { ContactDetailType, stateType } from "../types";
import { state } from "../Data/store";
import { maxKey } from "../utility/findMaxKey";

export const findMaxKey = (intialFind?: boolean): number => {
  if (intialFind) state.maxKeyVal = maxKey(state.contacts);
  else {
    state.maxKeyVal += 1;
  }
  return state.maxKeyVal;
};

//get all contacts;
export const getAll = () => {
  return state.contacts;
};

export const addContact = (contact: ContactDetailType): boolean => {
  state.contacts = [...state.contacts, contact];
  console.log(state);
  return true;
};
export const updateContact = (contact: ContactDetailType): boolean => {
  state.contacts = state.contacts.filter((c) => {
    return c.key != contact.key;
  });

  addContact(contact);
  return true;
};
export const deleteContact = (contact: ContactDetailType) => {
  state.contacts = state.contacts.filter((c) => {
    return c.key != contact.key;
  });
};
export const searchContact = (contactName: string): ContactDetailType[] => {
  const results: ContactDetailType[] = state.contacts.filter((o) =>
    o.firstName.concat(" ", o.lastName).toUpperCase().includes(contactName)
  );
  return results;
};
