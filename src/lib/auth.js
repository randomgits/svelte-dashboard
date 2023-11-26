import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';

export const user = writable(null);

onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    // User is signed in
    user.set(firebaseUser);
  } else {
    // No user is signed in
    user.set(null);
  }
});
