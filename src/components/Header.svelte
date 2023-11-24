<script>
  import { auth } from '../firebase.js';

  async function logout() {
    await auth.signOut();
    location.href = '/login';
  }
</script>

<header class="bg-primary text-primary-content">
  <nav class="navbar">
    <a class="btn btn-ghost normal-case text-xl" href="/login">Login</a>
    <a class="btn btn-ghost normal-case text-xl" href="/dashboard">Dashboard</a>
    <button class="btn" on:click={logout}>Logout</button>
  </nav>
</header>
