<script lang="ts">
    let userId: string = '';
    let password: string = '';

    const DEMO_USER_ID: string = 'demoUser';
    const DEMO_PASSWORD: string = 'demoPass';

    async function login(): Promise<void> {
        if(userId === DEMO_USER_ID && password === DEMO_PASSWORD) {
            location.href = '/dashboard'; // Redirect to dashboard
        } else {
            alert('Invalid credentials!');
        }
    }
</script>

<h2>Login</h2>
<div>
	<label>
		User ID: 
		<input bind:value={userId} placeholder="demoUser"/>
	</label>
	<label>
		Password: 
		<input type="password" bind:value={password} placeholder="demoPass"/>
	</label>
	<button on:click={login}>Login</button>
</div>
