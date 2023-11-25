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
  import Sidebar from '../components/Sidebar.svelte';

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
  <div class="flex-1 overflow-auto p-6">
    {#if activeTab === 'dashboard'}
      <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
      <!-- Dashboard content here -->
    {:else if activeTab === 'reverseText'}
      <ReverseText />
    {:else if activeTab === 'summarizeText'}
      <SummarizeText />
    {:else if activeTab === 'credits'}
      <h2 class="text-2xl font-bold mb-4">Credits</h2>
      <!-- Credits content here -->
    {/if}
  </div>
</div>