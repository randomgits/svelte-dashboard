import { writable } from 'svelte/store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.js';

export const user = writable(null);

onAuthStateChanged(auth, (firebaseUser) => {
  user.set(firebaseUser);
});
