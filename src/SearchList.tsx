import react, { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import { searchContact } from "./API/dataManipulationAPI";
import { ContactDetailType } from "./types";
import { Search } from "react-bootstrap-icons";

function SearchList({ onSearchComplete }) {
  const [searchPhrase, setSearchPhrase] = useState("");
  const handleSearch = async (e) => {
    console.log("###################  " + searchPhrase);
    e.preventDefault();
    const searchList: ContactDetailType[] = [...searchContact(searchPhrase)];
    onSearchComplete(searchList);
  };
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
        placeholder="Search"
        value={searchPhrase}
        onChange={(e) => {
          const val = e.target.value ? e.target.value.toUpperCase() : "";
          setSearchPhrase(val);
        }}
      />
    </div>
  );
}

export default SearchList;
