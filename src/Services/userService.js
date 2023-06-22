import firebase, { firebaseAuth } from "../Config/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export async function createUser(payload) {
  const responseUser = await firebase
    .auth()
    .createUserWithEmailAndPassword(payload.email, payload.password);
  const documentDB = await firebase.firestore().collection("users").add({
    name: payload.name,
    lastname: payload.lastname,
    userId: responseUser.user.uid,
  });
  console.log(documentDB);
  return documentDB;
}

export async function login(email, password) {
  const responseUser = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password);
  if (responseUser.user.uid) {
    const userDocument = await firebase
      .firestore()
      .collection("users")
      .where("userId", "==", responseUser.user.uid)
      .get();

    return userDocument.docs[0].data();
  }
  return {};
}

