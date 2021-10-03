import react, { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { searchContact } from "./API/dataManipulationAPI";
import { ContactDetailType } from "./types";
import { Search } from "react-bootstrap-icons";

function SearchList({ onSearchComplete }) {
  const [searchPhrase, setSearchPhrase] = useState("");

  useEffect(() => {
    onSearchComplete(searchContact(searchPhrase));
  }, [searchPhrase]);
  const waitBeforeSearch = async (timeLimit: number) => {
    await setInterval(() => {}, timeLimit);
  };
  return (
    <div>
      <input
        className="form-control"
        style={{ width: "100%" }}
        type="text"
        placeholder="search"
        value={searchPhrase}
        onChange={(e) => {
          const val = e.target.value ? e.target.value : "";
          setSearchPhrase(val);
        }}
      />
    </div>
  );
}

export default SearchList;
