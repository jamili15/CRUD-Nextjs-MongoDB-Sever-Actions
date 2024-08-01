import React from "react";
import SearchForm from "./SearchForm";
import Sort from "./Sort";

const Feature = () => {
  return (
    <div className="flex gap-5 my-7">
      <SearchForm />

      <Sort />
    </div>
  );
};

export default Feature;
