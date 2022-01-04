import firebase from "firebase/compat";
import "firebase/firestore";

import { auth, db } from "../index";

export const usersRef = db.collection("users");

type SignUpInfo = {
  email: string;
  password: string;
  name?: string;
};

export const signIn = async function (email: string, password: string) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch ({ message }) {
    alert(message);
  }
};

export const createUser = async function (signUpInfo: SignUpInfo) {
  const { email, password, name } = signUpInfo;

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    const defaultUserSchema = {
      name,
      email,
      uid: user?.uid,
    };
    await usersRef.doc(user?.uid).set(defaultUserSchema);
  } catch ({ message }) {
    alert(message);
  }
};
