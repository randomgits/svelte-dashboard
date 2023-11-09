<script lang="ts">
	let taskInput: string = '';
	let tasks: any[] = [];
	let credits: number = 4;  // This should ideally be fetched on page load.

	async function addTask(): Promise<void> {
		if(taskInput.trim() !== '' && credits > 0) {
			// Add task logic goes here...
			const response = await fetch('/api/add_task', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({text: taskInput, user_id: 'user1'})
			});



			const data = await response.json();
			if(response.ok) {
				tasks.push({id: data.task_id, name: `Task ${tasks.length + 1}`, status: 'Started', result: null});
			} else {
				alert(data.error);
			}
			credits = data.credits;
			taskInput = '';
		}
	}
</script>

<h1>Dashboard</h1>
<h2>Remaining Credits: {credits}</h2>
{#if credits === 0}
	<h3>Buy more credits</h3>
{/if}
<input bind:value={taskInput} placeholder="Enter text">
<button on:click={addTask}>Add</button>
{#each tasks as task}
	<div>
		<p>{task.name} {task.status}</p>
		{#if task.status === 'Complete'}
			<button>Show Result</button>
			<!-- Display task.result on button click -->
		{/if}
	</div>
{/each}
