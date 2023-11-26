<script>
  let credits = 4; // Example credits value

  function upgradeCredits() {
    goto('/upgrade'); // Navigate to Upgrade page
  }
</script>

<div class="p-4 bg-white shadow rounded">
  <h1 class="text-3xl font-bold">Credits</h1>
  <p class="text-xl mb-4">Remaining Credits: {credits}</p>
  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={upgradeCredits}>Upgrade</button>
</div>
