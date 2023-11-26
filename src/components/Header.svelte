<script>
  import { user } from '$lib/auth.js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let showDropdown = false;
  let currentUser = null;
  let isLoading = true;

  $: user.subscribe(u => {
    isLoading = false;
    currentUser = u ? u.email : null;
  });

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  async function logout() {
    await auth.signOut();
    currentUser = null; // Reset the user state
    showDropdown = false;
    goto('/login');
  }
</script>


<header class="bg-primary text-white shadow-md">
  <nav class="container mx-auto px-6 py-3 flex justify-between items-center">
    <a class="text-xl font-semibold" href="/dashboard">Your Brand</a>
    <div class="flex items-center">
      {#if currentUser}
        <div class="relative">
          <button class="text-lg mx-2 hover:text-secondary" on:click={toggleDropdown}>Profile</button>
          {#if showDropdown}
            <div class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
              <p class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Welcome {currentUser}!</p>
              <a href="/user-profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="/credits" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Credits</a>
              <a href="/settings" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" on:click={logout}>Logout</a>
            </div>
          {/if}
        </div>
      {:else}
        <a class="text-lg mx-2 hover:text-secondary" href="/login">Login</a>
      {/if}
      <a class="text-lg mx-2 hover:text-secondary" href="/dashboard">Dashboard</a>
    </div>
  </nav>
</header>