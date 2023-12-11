import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "firebase/auth";
import { auth } from "../services/firebase";

const UserContext = createContext();

export const AuthContextProvider = ({ filho }) => {
  const [user, setUser] = useState({});

  const cadastro = async (nome, email, password) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(user, { displayName: nome });
    return user;
  };

  const logar = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const sair = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const escrever = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
    });
    return () => {
      escrever();
    };
  });

  return (
    <UserContext.Provider value={{ cadastro, user, sair, logar }}>
      {filho}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
