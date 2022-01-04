import firebase from "firebase/compat";
import "firebase/firestore";

import { auth, db } from "../index";

export const usersRef = db.collection("users");

type SignUpInfo = {
  login: string;
  password: string;
  name: string;
};

export const isOfflineForDatabase = {
  state: "offline",
  lastChanged: firebase.database.ServerValue.TIMESTAMP,
};

export const isOnlineForDatabase = {
  state: "online",
  lastChanged: firebase.database.ServerValue.TIMESTAMP,
};

export const signIn = async function (email: string, password: string) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch ({ message }) {
    alert(message);
  }
};

export const createUser = async function (signUpInfo: SignUpInfo) {
  const { login, password, name } = signUpInfo;

  try {
    const { user } = await auth.createUserWithEmailAndPassword(login, password);
    const defaultUserSchema = {
      name,
      login,
      uid: user?.uid,
    };
    await usersRef.doc(user?.uid).set(defaultUserSchema);
  } catch ({ message }) {
    alert(message);
  }
};
