<script lang="ts">
	let taskInput: string = '';
	let tasks: any[] = [];
	let credits: number = 4;



	async function addTask(): Promise<void> {
		event.preventDefault();
		console.log("addTask called");
		if(taskInput.trim() !== '' && credits > 0) {
			const taskId = tasks.length;
			tasks = [...tasks, {id: taskId, name: `Task ${taskId + 1}`, status: 'Queued', result: null}];

			const response = await fetch('/api/add_task', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({text: taskInput, user_id: 'user1'})
			});

			const data = await response.json();
			console.log("Response data:", data); 
			if(response.ok) {
				if (data.task_id) {
					pollForTaskCompletion(data.task_id.toString(), taskId);
					console.log("Task ID:", data.task_id);
				} else {
					console.error("Task ID is undefined");
				}
			} else {
				alert(data.error);
			}
			credits--; // Update credits
			taskInput = '';
		}
	}


	async function pollForTaskCompletion(taskId, localTaskId) {
		console.log(`Starting to poll for task ID: ${taskId}`);
		const interval = setInterval(async () => {
			console.log(`Polling for task status. Task ID: ${taskId}`);
			try {
				console.log(`Fetching task status for ID: ${taskId}`);
				//const response = await fetch(`/api/task_status/${taskId}`);
				const response = await fetch(`https://cloud-run-microservice-template-python-razcvdqurq-uc.a.run.app/task_status/${taskId}`);
				console.log(`Fetched task status for ID: ${taskId}`);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				console.log(`Received data for task ID: ${taskId}`, data);
				if(data.status === 'Complete') {
					clearInterval(interval);
					updateTaskStatus(localTaskId, data.result);
				}
			} catch (error) {
				console.error("Error fetching task status:", error.message);
				clearInterval(interval); // Consider removing this line if you want to continue polling despite errors
			}
		}, 5000); // Poll every 5 seconds
	}



    function updateTaskStatus(localTaskId, result) {
        tasks = tasks.map(task => {
            if (task.id === localTaskId) {
                return { ...task, status: 'Complete', result: result };
            }
            return task;
        });
    }

	function toggleAccordion(taskId) {
        // Find the task in the tasks array
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, showResult: !task.showResult }; // Toggle the showResult property
            }
            return task;
        });
	}

</script>

<h1>Dashboard</h1>
<h2>Remaining Credits: {credits}</h2>
{#if credits === 0}
	<h3>Buy more credits</h3>
{/if}
<input bind:value={taskInput} placeholder="Enter text">
<button on:click|preventDefault={addTask}>Add</button>
{#each tasks as task}
    <div>
        <p>{task.name} {task.status}</p>
        {#if task.status === 'Complete'}
            <button on:click={() => toggleAccordion(task.id)}>See Result</button>
            <div class="accordion-content" style="{task.showResult ? 'display: block;' : 'display: none;'}">
                <p>Reversed Text: {task.result}</p>
            </div>
        {/if}
        {#if task.status === 'Queued'}
            <!-- Display progress bar here -->
        {/if}
    </div>
{/each}
