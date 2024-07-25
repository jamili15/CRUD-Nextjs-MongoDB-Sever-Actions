"use client";

import React, { useEffect } from "react";
import { useAppContext } from "@/context/Example-context";

const Page = () => {
  const { name, color, setColor, setName } = useAppContext();

  useEffect(() => {
    const storedColor = localStorage.getItem("color");
    const storedName = localStorage.getItem("name");

    if (storedColor) {
      setColor(storedColor);
    }
    if (storedName) {
      setName(storedName);
    }
  }, [setColor, setName]);

  const handleChangeColor = () => {
    const newColor = "#Ae35e3";
    setColor(newColor);
    localStorage.setItem("color", newColor);
  };

  const handleChangeName = () => {
    const newName = "Kevin";
    setName(newName);
    localStorage.setItem("name", newName);
  };

  return (
    <div>
      <span style={{ backgroundColor: color }}>{name}</span>
      <button
        onClick={() => {
          handleChangeColor();
        }}
        className=""
      >
        Change color
      </button>
      <button
        onClick={() => {
          handleChangeName();
        }}
        className=""
      >
        Change name
      </button>
    </div>
  );
};

export default Page;
