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
        setTimeout(() => {
          if (!$user) {
            goto('/login');
          }
        }, 1000);
      } else {
        currentUser = u;
      }
    });

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
    }
  }
</script>

<div class="min-h-screen bg-gray-100">
  <div class="container mx-auto p-6">
    <div class="flex justify-between items-center mb-6">
      <button class="btn btn-primary" on:click={() => { showReverseText = true }}>Reverse Text</button>
      <button class="btn btn-secondary" on:click={() => { showReverseText = false }}>Summarize Text</button>
      <button class="btn btn-accent" on:click={handleLogout}>Logout</button>
    </div>

    {#if showReverseText}
      <ReverseText />
    {:else}
      <SummarizeText />
    {/if}
  </div>
</div>
