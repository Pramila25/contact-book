import { ContactDetailType } from "../types";

export const maxKey = (contacts: ContactDetailType[]) => {
  let maxval: number = 0;
  contacts.forEach((cont) => {
    if (cont.key > maxval) {
      maxval = cont.key;
    }
  });
  return maxval;
};
