<script context="module">
  export const ssr = false;
</script>

<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { user } from '../lib/auth.js';
  import { signOut } from '../firebase.js';
  import ReverseText from '../components/ReverseText.svelte';
  import SummarizeText from '../components/SummarizeText.svelte';
  import Sidebar from '../components/Sidebar.svelte';

  // Redirect to login page if not authenticated
  $: if (!$user) {
    goto('/login');
  }

  let activeTab = 'dashboard';

  function setActiveTab(tab) {
    activeTab = tab;
  }
  
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


<div class="flex h-screen bg-gray-100">
  <Sidebar {activeTab} {setActiveTab} />
  <div class="flex-1 p-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#if activeTab === 'dashboard'}
        <!-- Dashboard cards or widgets go here -->
      {:else if activeTab === 'reverseText'}
        <ReverseText />
      {:else if activeTab === 'summarizeText'}
        <SummarizeText />
      {:else if activeTab === 'credits'}
        <!-- Credits content here -->
      {/if}
    </div>
  </div>
</div>