import React, { useEffect, useState } from "react";
import Cookie from "../img/cookie.png";
import { useAuth } from "../context";

const Clicker = () => {
  const { click, setClick, clickMultiplicateur } = useAuth();

  return (
    <div
      className="cookie w-1/2 h-1/2"
      onClick={() => setClick(click + clickMultiplicateur)}
    >
      <img src={Cookie} alt="Un cookie" />
    </div>
  );
};

export default Clicker;
