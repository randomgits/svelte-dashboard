<script>
  import Header from '../components/Header.svelte';
  import { user } from '$lib/auth.js';
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';

  let isAuthenticated = false;

  user.subscribe($user => {
    isAuthenticated = $user && $user.data;
  });

  onMount(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      goto('/login');
    }
  });

</script>

<Header />
<slot />

