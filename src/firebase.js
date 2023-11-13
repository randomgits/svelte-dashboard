// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz4yVra2RHVKnfCvqhgNdTWhSI1aqs3HI",
  authDomain: "gsa-test-b73e5.firebaseapp.com",
  projectId: "gsa-test-b73e5",
  storageBucket: "gsa-test-b73e5.appspot.com",
  messagingSenderId: "594042012002",
  appId: "1:594042012002:web:3ccf397765c5b11269ac3b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
