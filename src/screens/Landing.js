import React, { useState, useEffect } from "react";
import { useAuth } from "../context";
import { Header } from "../components";
import { Game } from "./Game";

function Landing() {
  const { profile, setProfile, storeData, isLoggedIn, SetIsLoggedIn } =
    useAuth();

  return (
    <div className="h-screen">
      <Header.Logged />
      <Game />
    </div>
  );
}

export { Landing };
