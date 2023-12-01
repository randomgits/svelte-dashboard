import { writable } from "svelte/store";
import { auth } from "../firebase.js"; // Import auth from firebase.js

// Check if running in the browser
const isBrowser = typeof window !== "undefined";

const storedUser = isBrowser ? JSON.parse(localStorage.getItem("user")) : null;
export const user = writable(
  storedUser
    ? { data: storedUser, loading: false }
    : { data: null, loading: true },
);

auth.onAuthStateChanged((firebaseUser) => {
  user.set({ loading: false, data: firebaseUser });
});
