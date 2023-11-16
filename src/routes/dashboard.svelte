<script>
  import { onMount } from 'svelte';
  import { user } from '../lib/auth.js';
  import { goto } from '$app/navigation';
  import { signOut } from '../firebase.js';
  import ReverseText from '../components/ReverseText.svelte';
  import SummarizeText from '../components/SummarizeText.svelte';

  let currentUser;
  let selectedTask = null;

  onMount(() => {
    // ... existing subscription logic ...
  });

  function selectTask(taskName) {
      console.log(`Task selected: ${taskName}`);
      selectedTask = taskName;
      selectedTask = taskName; // set the state again to trigger reactivity
  }


  async function handleLogout() {
    // ... existing logout logic ...
  }
  $: if (selectedTask) {
    console.log(`Current task: ${selectedTask}`);
}
</script>


<button on:click={() => selectTask('reverse')}>Reverse Text</button>
<button on:click={() => selectTask('summarize')}>Summarize Text</button>
<button on:click={handleLogout}>Logout</button>

{#if selectedTask === 'reverse'}
  <ReverseText />
{:else if selectedTask === 'summarize'}
  <SummarizeText />
{/if}
