<script lang="ts">
	let userId: string = '';
	let password: string = '';
	let isAuthenticated: boolean = false;
	let taskInput: string = '';
	let tasks: any[] = [];
	let credits: number = 4; 

	const DEMO_USER_ID: string = 'demoUser';
	const DEMO_PASSWORD: string = 'demoPass';

	async function login(): Promise<void> {
		if(userId === DEMO_USER_ID && password === DEMO_PASSWORD) {
			isAuthenticated = true;
			// Fetch initial data if needed here...
		} else {
			alert('Invalid credentials!');
		}
	}

	async function addTask(): Promise<void> {
		// ... Add task logic from the previous example
	}
</script>

{#if !isAuthenticated}
	<!-- Login Page -->
	<!-- ... as before -->
{:else}
	<!-- Dashboard -->
	<!-- ... as before but with {credits} instead of {$credits} -->
{/if}
