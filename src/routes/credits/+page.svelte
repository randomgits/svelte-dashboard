<script context="module">
  import { checkAuth } from '$lib/authCheck';
  import { goto } from '$app/navigation';

  export async function load({ session }) {
    const currentUser = await checkAuth(session);

    if (!currentUser) {
      goto('/login', { replace: true });
      return;
    }

    return {
      props: {
        currentUser
      }
    };
  }
</script>
<script lang="ts">
    import Credits from '../credits.svelte';  // Corrected path
</script>

<Credits />