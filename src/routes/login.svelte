<script>
  import { auth } from '../firebase.js';
  import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
  import { goto } from '$app/navigation'; // Import goto for navigation

  let email = '';
  let password = '';

  function isValidEmail(email) {
    // Simple regex for basic email validation
    return /\S+@\S+\.\S+/.test(email);
  }

  async function login() {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      goto('/dashboard'); // Use goto for navigation
    } catch (error) {
      alert(error.message);
    }
  }

  async function register() {
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      goto('/dashboard'); // Use goto for navigation
    } catch (error) {
      alert(error.message);
    }
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="p-6 max-w-sm w-full bg-white shadow-md rounded">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Login</h2>
    <div class="mb-4">
      <input class="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" type="email" bind:value={email} placeholder="Email" />
    </div>
    <div class="mb-4">
      <input class="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" type="password" bind:value={password} placeholder="Password" />
    </div>
    <div class="flex items-center justify-between">
      <button class="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded" on:click={login}>Login</button>
      <button class="bg-secondary hover:bg-primary text-white font-bold py-2 px-4 rounded" on:click={register}>Register</button>
    </div>
  </div>
</div>