<!-- src/components/Header.svelte -->
<script>
  import { auth } from '../firebase.js';

  async function logout() {
    await auth.signOut();
    location.href = '/login';
  }
</script>

<header class="bg-primary text-white shadow-md">
  <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
  <a class="text-xl font-semibold" href="/dashboard">Your Brand</a>
    <div class="flex items-center">
      <a class="text-lg mx-2 hover:text-secondary" href="/login">Login</a>
      <a class="text-lg mx-2 hover:text-secondary" href="/dashboard">Dashboard</a>
      <button class="bg-secondary text-white px-4 py-2 rounded hover:bg-secondary-dark" on:click={logout}>Logout</button>
    </div>
  </nav>
</header>
