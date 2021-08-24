import React from "react";
import { Input } from "../input/Input";
import "./search.css";

const Search = () => {
  return (
    <Input type="text" className={"searchInput"} placeholder="type to search" />
  );
};

export default Search;
