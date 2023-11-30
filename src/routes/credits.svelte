<script>
  import { user } from '$lib/auth.js';
  import { signOut } from '../firebase.js';
  import { goto } from '$app/navigation';

  let showDropdown = false;
  let currentUser;
  let credits = 4; // Assuming this is the default credits

  $: currentUser = $user ? $user.email : null;

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  async function logout() {
    await signOut();
    showDropdown = false;
    goto('/login');
  }

  function upgradeCredits() {
    // Implement the functionality for upgrading credits
    // For example, navigating to a payment page or incrementing credits
    // goto('/payment'); or credits += 10; as an example
  }
</script>

<div class="p-4 bg-white shadow rounded">
  <h1 class="text-3xl font-bold">Credits</h1>
  <p class="text-xl mb-4">Remaining Credits: {credits}</p>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={upgradeCredits}>Upgrade</button>
</div>
