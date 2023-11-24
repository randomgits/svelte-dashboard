<script lang="ts">
	let taskInput: string = '';
	let tasks: any[] = [];
	let credits: number = 4;

	async function addTask(): Promise<void> {
		event.preventDefault();
		console.log("addTask called");
		if (taskInput.trim() !== '' && credits > 0) {
			const taskId = tasks.length;
			tasks = [...tasks, {id: taskId, name: `Task ${taskId + 1}`, status: 'Queued', result: null}];

			const response = await fetch('/api/add_task', {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({text: taskInput, user_id: 'user1'})
			});

			const data = await response.json();
			console.log("Response data:", data); 
			if (response.ok) {
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
        const interval = setInterval(async () => {
            try {
                //const response = await fetch(`/api/task_status/${taskId}`);
                const response = await fetch(`https://cloud-run-microservice-template-python-razcvdqurq-uc.a.run.app/task_status/${taskId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                if (data.status === 'Complete') {
                    clearInterval(interval);
                    updateTaskStatus(localTaskId, 'Complete', data.result);
                } else if (data.status === 'In progress') {
                    updateTaskStatus(localTaskId, 'Processing', null);
                }
            } catch (error) {
                console.error("Error fetching task status:", error.message);
                clearInterval(interval); // Stop polling on error
            }
        }, 5000); // Poll every 5 seconds
    }

    function updateTaskStatus(localTaskId, status, result) {
        tasks = tasks.map(task => {
            if (task.id === localTaskId) {
                return { ...task, status: status, result: result };
            }
            return task;
        });
    }

	function toggleAccordion(taskId) {
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
        {#if task.status === 'Queued' || task.status === 'Processing'}
            <div class="loading-bar">
                <div class="loading-indicator"></div>
            </div>
        {/if}
        {#if task.status === 'Complete'}
            <button on:click={() => toggleAccordion(task.id)}>See Result</button>
            <div class="accordion-content" style="{task.showResult ? 'display: block;' : 'display: none;'}">
                <p>Reversed Text: {task.result}</p>
            </div>
        {/if}
    </div>
{/each}

<style>
    .loading-bar {
        width: 100%;
        background-color: #e0e0e0;
        border-radius: 2px;
    }

    .loading-indicator {
        height: 4px;
        width: 100%;
        background-color: #3b76f6;
        border-radius: 2px;
        animation: loading-animation 2s infinite;
    }

    @keyframes loading-animation {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
</style>
