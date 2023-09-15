import React, { useEffect } from "react";
import { useAuth } from "../context";
import { Button } from ".";
import client from "../api/client";

const Logged = () => {
  const { profile, isLoggedIn, signOut } = useAuth();

  const fetchUserData = async (values, formikActions) => {
    const userToken = profile.token;

    try {
      const res = await client.get("http://localhost:8000/api/user/data", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        const token = res.data;
        console.log("fetch data utilisateur validé :", token);
      } else {
        console.log("fetchUserData failed");
      }
    } catch (error) {
      console.log("Erreur fetchUserData :", error.message);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div className="w-full h-20 bg-neutral-300">
      {isLoggedIn ? (
        <div className="w-full h-full flex flex-row items-center justify-between px-4">
          <h2 className="text-xl">Bienvenue {profile.username}</h2>
          <Button.Primary value={"Se déconnecter"} onClick={() => signOut()} />
        </div>
      ) : null}
    </div>
  );
};

export { Logged };
