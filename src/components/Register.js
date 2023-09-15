import React, { useState, useEffect } from "react";
import { Input, Button } from ".";
import { Formik, getIn } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import { useAuth } from "../context";
import { isExpired, decodeToken } from "react-jwt";

function FormulaireInscription() {
  const { profile, setProfile, storeData, isLoggedIn, setIsLoggedIn } =
    useAuth();

  const validationSchema = Yup.object({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    plainPassword: Yup.string()
      .trim()
      .min(5, "Le mot de passe doit faire plus de cinq caractères")
      .required("Le mot de passe est requis"),
  });

  const [userInfo, setUserInfo] = useState({
    username: "",
    plainPassword: "",
  });

  const { username, plainPassword } = userInfo;

  const [errorLogin, setErrorLogin] = useState(false);

  const registerUser = async (values, formikActions) => {
    try {
      const res = await client.post("http://localhost:8000/api/register", {
        ...values,
      });
      if (res.data) {
        const token = res.data;
        setProfile(token);
        storeData(token);
        setIsLoggedIn(true);
        setUserInfo({ email: "", plainPassword: "" });
        console.log("Création utilisateur validé :", token);
      } else {
        console.log("registerUser failed");
        setErrorLogin(true);
      }
      formikActions.setSubmitting(false);
    } catch (error) {
      console.log("Erreur registerUser :", error.message);
    }
  };

  return (
    <div className="bg-[#CFCFCF] shadow-md p-3">
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={registerUser}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => {
          const { username, plainPassword } = values;
          return (
            <div>
              <h1 className="text-xl text-center">Inscription</h1>
              <div>
                <div className="mb-4">
                  <Input.Primary
                    value={username}
                    error={touched.username ? errors.username : null}
                    label="Entrez votre nom d'utilisateur"
                    placeholder="user"
                    type="text"
                    onBlur={handleBlur("username")}
                    onChange={handleChange("username")}
                  />
                </div>
                <div>
                  <Input.Primary
                    value={plainPassword}
                    error={touched.plainPassword ? errors.plainPassword : null}
                    label="Entrez votre mot de passe"
                    placeholder="motdepasse"
                    type="password"
                    onBlur={handleBlur("plainPassword")}
                    onChange={handleChange("plainPassword")}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button.Primary
                  onClick={handleSubmit}
                  value="S'inscrire"
                  center={true}
                />
              </div>
              {isLoggedIn ? (
                <h1>Connecté en tant que {profile.username}</h1>
              ) : null}
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

function FormulaireConnexion() {
  const { profile, setProfile, storeData, isLoggedIn, setIsLoggedIn, getData } =
    useAuth();

  const validationSchema = Yup.object({
    username: Yup.string().required("Le nom d'utilisateur est requis"),
    password: Yup.string()
      .trim()
      .min(5, "Le mot de passe doit faire plus de cinq caractères")
      .required("Le mot de passe est requis"),
  });

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const { username, password } = userInfo;

  const [errorLogin, setErrorLogin] = useState(false);

  const logInUser = async (values, formikActions) => {
    try {
      const res = await client.post("http://localhost:8000/api/login_check", {
        ...values,
      });
      if (res.data) {
        const token = res.data.token;
        const myDecodedToken = decodeToken(token);
        setProfile({
          username: myDecodedToken.username,
          token: token,
        });
        storeData({
          username: myDecodedToken.username,
          token: token,
        });
        setIsLoggedIn(true);
        setUserInfo({ email: "", password: "" });
        console.log("Création utilisateur validé :", token);
      } else {
        console.log("logInUser failed");
        setErrorLogin(true);
      }
      formikActions.setSubmitting(false);
    } catch (error) {
      console.log("Erreur logInUser :", error.message);
    }
  };

  return (
    <div className="bg-[#CFCFCF] shadow-md p-3">
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={logInUser}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => {
          const { username, password } = values;
          return (
            <div>
              <h1 className="text-xl text-center">Connexion</h1>
              <div>
                <div className="mb-4">
                  <Input.Primary
                    value={username}
                    error={touched.username ? errors.username : null}
                    label="Entrez votre nom d'utilisateur"
                    placeholder="user"
                    type="text"
                    onBlur={handleBlur("username")}
                    onChange={handleChange("username")}
                  />
                </div>
                <div>
                  <Input.Primary
                    value={password}
                    error={touched.password ? errors.password : null}
                    label="Entrez votre mot de passe"
                    placeholder="motdepasse"
                    type="password"
                    onBlur={handleBlur("password")}
                    onChange={handleChange("password")}
                  />
                </div>
              </div>
              <div className="mt-6">
                <Button.Primary
                  onClick={handleSubmit}
                  value="Se connecter"
                  center={true}
                />
              </div>
              {isLoggedIn ? (
                <h1>Connecté en tant que {profile.username}</h1>
              ) : null}
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export { FormulaireInscription, FormulaireConnexion };
