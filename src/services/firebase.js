import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyDcuJW_SjAZtR2ifcp20DjzyFXZl2P0v84",
  authDomain: "lista-de-tarefas-com-login.firebaseapp.com",
  projectId: "lista-de-tarefas-com-login",
  storageBucket: "lista-de-tarefas-com-login.appspot.com",
  messagingSenderId: "380403888140",
  appId: "1:380403888140:web:9e6549c4f749227fefbe29",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const bd = getFirestore(app);