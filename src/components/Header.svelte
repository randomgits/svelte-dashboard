<script>
  import { auth } from '../firebase.js';

  async function logout() {
    await auth.signOut();
    location.href = '/login';
  }</script>

<header>
  <!-- Your header content -->
  <nav>
    <a href="/login">Login</a>
    <a href="/dashboard">Dashboard</a>
    <button on:click={logout}>Logout</button>

  </nav>
</header>