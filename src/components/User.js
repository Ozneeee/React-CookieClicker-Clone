import React, { useEffect, useState } from "react";
import { useAuth } from "../context";

const User = () => {
  const { profile, click, clickMultiplicateur, cps } = useAuth();

  return (
    <div>
      <h1 className="text-xl text-center underline">{profile.username}</h1>
      <div className="w-full bg-neutral-100 py-2 px-1 mt-2 cursor-pointer">
        <p>
          Total de cookies : <span className="font-semibold">{click}</span>
        </p>
      </div>
      <div className="w-full bg-neutral-100 py-2 px-1 mt-2 cursor-pointer">
        <p>
          Cookies d'un clic :
          <span className="font-semibold">{clickMultiplicateur}</span>
        </p>
      </div>
      <div className="w-full bg-neutral-100 py-2 px-1 mt-2 cursor-pointer">
        <p>
          Cookies par seconde : <span className="font-semibold">{cps}</span>
        </p>
      </div>
    </div>
  );
};

export default User;
