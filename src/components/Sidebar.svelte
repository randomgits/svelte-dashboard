<script>
  import { signOut } from '../firebase.js';
  import { goto } from '$app/navigation';
  import DashboardIcon from '../icons/DashboardIcon.svelte';
  import HamburgerMenuIcon from '../icons/HamburgerMenuIcon.svelte';
  import { onMount } from 'svelte';
  export let activeTab;
  export let setActiveTab;
  let isMobile = false;
  let isSidebarOpen = true;
  let isTasksOpen = false;

  onMount(() => {
    isMobile = window.innerWidth < 768;
    isSidebarOpen = !isMobile;
  });

  function toggleSidebar() {
    isSidebarOpen = !isSidebarOpen;
  }

  function toggleTasks() {
    isTasksOpen = !isTasksOpen;
  }

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

<div class={`bg-gray-800 text-white flex flex-col h-screen ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
  <div class="flex items-center justify-between p-4">
    <div class="text-xl font-bold text-white">Dashboard</div>
    <button on:click={toggleSidebar} class="text-gray-100 focus:outline-none md:hidden">
              <HamburgerMenuIcon />
    </button>
  </div>
  <nav class="flex-grow">
    <ul class="space-y-2">
      <li>
        <a class="sidebar-item flex items-center" on:click={() => setActiveTab('dashboard')}>
              <DashboardIcon />
            <span class={`${isSidebarOpen ? 'inline' : 'hidden'} ml-2`}>Dashboard</span>
        </a>
      </li>
      <li>
        <button class="sidebar-item flex items-center" on:click={toggleTasks}>
          <!-- Tasks Icon SVG -->
          <span class={`${isSidebarOpen ? 'inline' : 'hidden'} ml-2`}>Tasks</span>
        </button>
        <ul class={`${isTasksOpen ? 'block' : 'hidden'} pl-6`}>
          <li>
            <a class="sidebar-item flex items-center" on:click={() => setActiveTab('reverseText')}>
              <!-- Reverse Text Icon SVG -->
              <span class={`${isSidebarOpen ? 'inline' : 'hidden'} ml-2`}>Reverse Text</span>
            </a>
          </li>
          <li>
            <a class="sidebar-item flex items-center" on:click={() => setActiveTab('summarizeText')}>
              <!-- Summarize Text Icon SVG -->
              <span class={`${isSidebarOpen ? 'inline' : 'hidden'} ml-2`}>Summarize Text</span>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a class="sidebar-item flex items-center" on:click={() => setActiveTab('credits')}>
          <!-- Credits Icon SVG -->
          <span class={`${isSidebarOpen ? 'inline' : 'hidden'} ml-2`}>Credits</span>
        </a>
      </li>
    </ul>
  </nav>
  <div class="p-4">
    <a class="sidebar-item flex items-center" on:click={handleLogout}>
      <!-- Logout Icon SVG -->
      <span class={`${isSidebarOpen ? 'inline' : 'hidden'} ml-2`}>Logout</span>
    </a>
  </div>
</div>

<style>
  .sidebar-item {
    padding: 0.75rem 1rem;
    margin: 0.25rem 0;
    border-radius: 0.375rem;
    transition: background-color 0.2s, color 0.2s;
  }
  .sidebar-item:hover {
    background-color: #4a5568;
  }
  .transition-width {
    transition: width 0.3s ease;
  }

</style>