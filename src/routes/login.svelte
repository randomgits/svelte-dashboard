<script>
  import { auth } from '../firebase.js';
  
  let email = '';
  let password = '';

  async function login() {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      location.href = '/dashboard';
    } catch (error) {
      alert(error.message);
    }
  }

  async function register() {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      location.href = '/dashboard';
    } catch (error) {
      alert(error.message);
    }
  }
</script>

<h2>Login</h2>
<!-- Add login form here -->
<button on:click={login}>Login</button>
<button on:click={register}>Register</button>
