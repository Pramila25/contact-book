export interface ContactDetailType {
  key: number;
  firstName: string;
  lastName: string;
  emails?: string[];
}
export interface stateType {
  contacts: ContactDetailType[];
  maxKeyVal: number;
}
