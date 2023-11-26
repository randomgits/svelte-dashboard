<script>
  import { user } from '$lib/auth.js';

  let currentUser;
  $: if (user) {
    currentUser = $user.email; // assuming the user object has an email field
  }
</script>

<div class="p-4 bg-white shadow rounded">
  <h1 class="text-3xl font-bold">User Profile</h1>
  <p class="text-xl mb-4">Email: {currentUser}</p>
  <!-- Add more user details here -->
</div>
