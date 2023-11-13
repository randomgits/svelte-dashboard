<script context="module">
  export const ssr = false;
</script>
<script>
  import { onMount } from 'svelte';
  import { user } from '../lib/auth.js';

  let currentUser;

  user.subscribe((u) => {
    currentUser = u;
    if (!currentUser) {
      location.href = '/login';
    }
  });


  let showReverseText = true;
  import ReverseText from '../components/ReverseText.svelte';
  import SummarizeText from '../components/SummarizeText.svelte';
</script>

<button on:click={() => { showReverseText = true }}>Reverse Text</button>
<button on:click={() => { showReverseText = false }}>Summarize Text</button>

{#if showReverseText}
  <ReverseText />
{:else}
  <SummarizeText />
{/if}

