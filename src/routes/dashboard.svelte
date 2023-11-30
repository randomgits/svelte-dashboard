<script context="module">
  // Server-side guard
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
  import { onMount } from 'svelte';
  import Sidebar from '../components/Sidebar.svelte';
  import ReverseText from '../components/ReverseText.svelte';
  import SummarizeText from '../components/SummarizeText.svelte';
  import { signOut } from '../firebase.js';
  import { goto } from '$app/navigation';

  let activeTab = 'dashboard';
  let currentUser = null;
  let isAuthenticated = false;
  let isLoading = true; // Initial loading state

  function setActiveTab(tab) {
    activeTab = tab;
  }

  // Subscribe to user store
  user.subscribe($user => {
    currentUser = $user;
    isAuthenticated = $user && $user.data;
    isLoading = false; // Update loading state after checking user
  });

  onMount(() => {
    if (!isLoading && !isAuthenticated) {
      goto('/login');
    }
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

{#if isLoading}
  <!-- Loading indicator here -->
{:else if isAuthenticated}
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
{:else}
  <!-- Optionally, render a loading indicator or nothing here -->
{/if}