import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDcSmo131DRnUu08RlZUbWelcCl6j6_zfY",
  authDomain: "line-clone-e20ba.firebaseapp.com",
  projectId: "line-clone-e20ba",
  storageBucket: "line-clone-e20ba.appspot.com",
  messagingSenderId: "539715540541",
  appId: "1:539715540541:web:24466f7be9888faefffc54",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
export default firebase;
