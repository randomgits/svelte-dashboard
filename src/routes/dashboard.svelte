<script context="module">
  import { goto } from '$app/navigation';

  export async function load({ session }) {
    // Check if user is authenticated
    if (!session.user) {
      // Redirect to login page if not authenticated
      return goto('/login');
    }
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { user } from '../lib/auth.js';
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
      currentUser = u;
    });

    return () => {
      unsubscribe();
    };
  });

  async function handleLogout() {
    try {
      await signOut();
      // This is client-side specific
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