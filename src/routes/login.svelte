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

<h2>Login</h2>
<!-- Add login form here -->
<div>
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
</div>
<button on:click={login}>Login</button>
<button on:click={register}>Register</button>