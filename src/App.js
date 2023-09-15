import React, { useState, useEffect } from "react";
import "./App.css";
import { Button, Register } from "./components";
import { Landing } from "./screens/Landing";
import { useAuth } from "./context";

function App() {
  const { profile, setProfile, storeData, isLoggedIn, setIsLoggedIn } =
    useAuth();

  const [logginState, setLogginState] = useState(false);
  const [register, setRegister] = useState(true);

  useEffect(() => {
    setLogginState(isLoggedIn);
  }, [isLoggedIn]);

  return (
    <div className="App">
      {logginState ? (
        <Landing />
      ) : (
        <div>
          <div className="w-full py-5 bg-neutral-300">
            <h1 className="text-2xl text-center">
              Bienvenue sur Cookie Clicker
            </h1>
            <div className="w-full h-full flex flex-row items-center justify-center px-4 mt-4">
              <div className="mr-2">
                <Button.Primary
                  value={"S'inscrire"}
                  onClick={() => setRegister(true)}
                />
              </div>
              <div className="mr-2">
                <Button.Primary
                  value={"Se Connecter"}
                  onClick={() => setRegister(false)}
                />
              </div>
            </div>
          </div>
          <div className="w-full p-5">
            {register ? (
              <Register.FormulaireInscription />
            ) : (
              <Register.FormulaireConnexion />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
