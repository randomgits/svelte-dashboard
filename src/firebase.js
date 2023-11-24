import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserSessionPersistence,
  signOut as firebaseSignOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBz4yVra2RHVKnfCvqhgNdTWhSI1aqs3HI",
  authDomain: "gsa-test-b73e5.firebaseapp.com",
  projectId: "gsa-test-b73e5",
  storageBucket: "gsa-test-b73e5.appspot.com",
  messagingSenderId: "594042012002",
  appId: "1:594042012002:web:3ccf397765c5b11269ac3b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence).catch((error) => {
  console.error("Firebase persistence error:", error);
});

export const signOut = () => {
  return firebaseSignOut(auth);
};

export { auth };