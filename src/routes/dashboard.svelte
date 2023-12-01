<script context="module">
  export async function load({ session }) {
    if (!session.user) {
      return {
        status: 302,
        redirect: '/login'
      };
    }
    return {};
  }
</script>

<script>
  import { user } from '$lib/auth.js';
  import Sidebar from '../components/Sidebar.svelte';
  import ReverseText from '../components/ReverseText.svelte';
  import SummarizeText from '../components/SummarizeText.svelte';
  import { signOut } from '../firebase.js';
  import { goto } from '$app/navigation';
  
  let activeTab = 'dashboard';
  let isAuthenticated = false;
  let isLoading = true;
  
  user.subscribe($user => {
    isAuthenticated = !!$user.data;
    isLoading = false;
  });

  // Define the setActiveTab function
  function setActiveTab(tab) {
    activeTab = tab;
  }

  async function handleLogout() {
    await signOut();
    goto('/login');
  }
</script>

{#if isLoading}
  <!-- Loading indicator here -->
{:else if isAuthenticated}
  <div class="flex h-screen bg-gray-100">
    <Sidebar {activeTab} {setActiveTab} />
    <div class="flex-1 p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {#if activeTab === 'dashboard'}
          <!-- Dashboard content here -->
        {:else if activeTab === 'reverseText'}
          <ReverseText />
        {:else if activeTab === 'summarizeText'}
          <SummarizeText />
        {/if}
      </div>
    </div>
  </div>
{:else}
  <!-- Optionally, render a loading indicator or nothing here -->
{/if}
