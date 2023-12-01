<script>
  import Header from '../components/Header.svelte';
  import { user } from '$lib/auth.js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let isAuthenticated = false;

  user.subscribe($user => {
    isAuthenticated = !!$user.data;

    // Check authentication inside the subscription
    if (!isAuthenticated && typeof window !== 'undefined') {
      goto('/login');
    }
  });

  // Removed the onMount check as it is now handled inside the subscription
</script>

<Header />
<slot />
