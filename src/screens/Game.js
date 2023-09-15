import React, { useState, useEffect } from "react";
import { useAuth } from "../context";
import Clicker from "../components/Clicker";
import Shop from "../components/Shop";
import User from "../components/User";
function Game() {
  const { profile, setProfile, storeData, isLoggedIn, SetIsLoggedIn } =
    useAuth();

  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="p-5 w-full h-4/5 flex flex-row justify-between">
      <div className="w-1/3 bg-neutral-300 p-5">
        <User />
      </div>
      <div className="w-1/3 bg-neutral-100 p-5 flex flex-row justify-center items-center">
        <Clicker />
      </div>
      <div
        onMouseEnter={() => setShowNavbar(true)}
        onMouseLeave={() => setShowNavbar(false)}
        className={
          showNavbar
            ? "w-1/3 bg-neutral-300 p-5 overflow-x-hidden overflow-y-auto"
            : "w-1/3 bg-neutral-300 p-5"
        }
      >
        <Shop />
      </div>
    </div>
  );
}

export { Game };
