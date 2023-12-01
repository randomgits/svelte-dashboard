import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";


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

if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  });
}

const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export { auth, signOut };