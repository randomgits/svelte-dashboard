import { onMount } from "svelte";
import { writable } from "svelte/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.js";
import { onMount } from 'svelte';

export const user = writable(null);

onMount(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.set(firebaseUser);
  });
});


