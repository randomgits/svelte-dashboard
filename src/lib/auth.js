import { writable } from 'svelte/store';

export const user = writable({ loading: true, data: null });

if (typeof window !== 'undefined') {
  import('firebase/auth').then(({ getAuth, onAuthStateChanged }) => {
    const auth = getAuth();

    onAuthStateChanged(auth, (firebaseUser) => {
      user.set({ loading: false, data: firebaseUser });
    });
  });
}