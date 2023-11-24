<script context="module">
  export const ssr = false;
</script>

<script>
  import { onMount } from 'svelte';
  import { user } from '../lib/auth.js';
  import { goto } from '$app/navigation';
  import { signOut } from '../firebase.js';
  import ReverseText from '../components/ReverseText.svelte';
  import SummarizeText from '../components/SummarizeText.svelte';

  let currentUser;
  let showReverseText = true;

onMount(() => {
  const unsubscribe = user.subscribe((u) => {
    if (u === null) {
      // Optional: introduce a delay before redirecting
      setTimeout(() => {
        if (!$user) {
          goto('/login');
        }
      }, 1000); // 1 second delay
    } else {
      currentUser = u;
    }
  });

  // Cleanup
  return () => {
    unsubscribe();
  };
});


  async function handleLogout() {
    try {
      await signOut();
      goto('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Handle any errors that occur during logout
    }
  }
</script>

<button on:click={() => { showReverseText = true }}>Reverse Text</button>
<button on:click={() => { showReverseText = false }}>Summarize Text</button>
<button on:click={handleLogout}>Logout</button>

{#if showReverseText}
  <ReverseText />
{:else}
  <SummarizeText />
{/if}