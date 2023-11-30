<script>
  import { user } from '$lib/auth.js';

  let currentUser = null;

  // Subscribe to the user store
  $: user.subscribe($user => {
    currentUser = $user && $user.data ? $user.data.email : null;
  });
</script>

<div>
  <h1>User Profile</h1>
  {#if currentUser}
    <p>Email: {currentUser}</p>
  {:else}
    <p>Loading user information...</p>
  {/if}
</div>
