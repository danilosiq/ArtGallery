import { db } from "../firebase/config";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

import { useState, useEffect } from "react";

export const useAuthen = () => {
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(null);

  //clanup
  const [cancelled, setcalcelled] = useState(false);

  const auth = getAuth();

  function CheckIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  //register
  const createUser = async (data) => {
    CheckIsCancelled();
    setloading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await updateProfile(user, {
        displayName: data.displayName,
      });
      return user;

    } catch (error) {
      console.log("ERRO" + error.message);
      console.log("ERROTIPO" + typeof error.message);

      let sysERRmsg;

      if (error.message.includes("Password")) {
        sysERRmsg = "A senha precisa ter pelo menos 6 caracteres!";
      } else if (error.message.includes("email-alredy")) {
        sysERRmsg = "Email ja cadastrado! tente outro";
      } else if (error.message.includes("invalid-email")) {
        sysERRmsg = "Email invalido";
      }
      setError(sysERRmsg);
    }
    setloading(false);
  };

  //logout
  const logout = () => {
    CheckIsCancelled();
    signOut(auth);
  };

  const login = async (data) => {
    CheckIsCancelled();

    setloading(true);
    setError(false);
    

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error) {
      let sysERRmsg;
      console.log("ERRO" + error.message);
      if (error.message.includes("auth/invalid-email")) {
        sysERRmsg = "Usuario inexistente";
      } else if (error.message.includes("auth/invalid-credential")) {
        sysERRmsg = "Usuario ou senha invalidos";
      }
      setError(sysERRmsg);
      setloading(false);
    }
    setloading(false);
  };

  useEffect(() => {
    return () => setcalcelled(true);
  }, []);

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login,
  };
};
