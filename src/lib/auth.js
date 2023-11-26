import { writable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";

export const user = writable({ loading: true, data: null });

onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    // User is signed in
    user.set({ loading: false, data: firebaseUser });
  } else {
    // No user is signed in
    user.set({ loading: false, data: null });
  }
});
