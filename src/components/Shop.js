import React, { useEffect, useState } from "react";
import { useAuth } from "../context";
import client from "../api/client";

const Shop = () => {
  const {
    profile,
    click,
    setClick,
    cps,
    setCps,
    clickMultiplicateur,
    setClickMultiplicateur,
  } = useAuth();

  const [ameliorations, setAmeliorations] = useState([]);
  const [workers, setWorkers] = useState([]);

  const fetchAmeliorations = async () => {
    const userToken = profile.token;

    try {
      const res = await client.get("http://localhost:8000/api/upgrades", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        const token = res.data;
        setAmeliorations(res.data);
        console.log("fetch upgrades validé :", token);
      } else {
        console.log("fetchAmeliorations failed");
      }
    } catch (error) {
      console.log("Erreur fetchAmeliorations :", error.message);
    }
  };

  const fetchWorkers = async () => {
    const userToken = profile.token;

    try {
      const res = await client.get("http://localhost:8000/api/workers", {
        headers: {
          Authorization: `Bearer ${userToken}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.data) {
        const token = res.data;
        setWorkers(res.data);
        console.log("fetch workers validé :", token);
      } else {
        console.log("fetchWorkers failed");
      }
    } catch (error) {
      console.log("Erreur fetchWorkers :", error.message);
    }
  };

  useEffect(() => {
    fetchAmeliorations();
    fetchWorkers();
  }, []);

  const buyUpgrade = (name, price) => {
    setClick(click - price);
    setClickMultiplicateur(clickMultiplicateur + 2)
  };

  const buyWorkers = (name, price, baseIncome) => {
    setClick(click - price);
    setCps(cps + baseIncome);
  };

  return (
    <div className="overflow-x-hidden overflow-y-auto">
      <h1 className="text-xl text-center underline">Boutique</h1>
      <div>
        <h1 className="text-xl mt-5">Upgrades :</h1>
        {ameliorations.map((i) => {
          return (
            <div
              key={i.id}
              className={
                click > i.price
                  ? "w-full bg-neutral-100 py-2 px-1 mt-2 cursor-pointer"
                  : "w-full bg-neutral-100 py-2 px-1 mt-2 cursor-no-drop"
              }
              onClick={() => {
                click > 1
                  ? buyUpgrade(i.upgradeName, i.price)
                  : console.log("pas assez de cookie");
              }}
            >
              <h1 className="text-xl font-semibold mt-2">{i.upgradeName}</h1>
              <p className="text-xs mt-2">{i.upgradeDesc}</p>
              <h3 className="text-md">{i.price} cookies</h3>
            </div>
          );
        })}
      </div>
      <div>
        <h1 className="text-xl mt-5">Workers :</h1>
        {workers.map((i) => {
          return (
            <div
              key={i.id}
              className={
                click > i.basePrice
                  ? "w-full bg-neutral-100 py-2 px-1 mt-2 cursor-pointer"
                  : "w-full bg-neutral-100 py-2 px-1 mt-2 cursor-no-drop"
              }
              onClick={() => {
                click > i.basePrice
                  ? buyWorkers(i.name, i.basePrice, i.baseIncome)
                  : console.log("pas assez de cookie");
              }}
            >
              <h1 className="text-xl font-semibold mt-2">{i.name}</h1>
              <p className="text-xs mt-2">
                Rapporte {i.baseIncome} cookies par secondes
              </p>
              <h3 className="text-md">{i.basePrice} cookies</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
