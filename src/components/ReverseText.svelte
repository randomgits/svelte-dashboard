<script lang="ts">
    import { reverseTextTask } from '../services/taskService.js';
    let taskInput: string = '';
    let tasks: any[] = [];
    let credits: number = 4;

async function addTask(event) {
    event.preventDefault();
    console.log("Submitting task:", taskInput); // Debug log

    const response = await reverseTextTask(taskInput);
    if (response && response.ok) {
        console.log("Task submitted, response:", response);
        // Update tasks and credits based on the response
        credits--;
        taskInput = '';
    } else {
        console.error("Error or no data in response");
    }
}



    // Other functions (pollForTaskCompletion, updateTaskStatus, etc.)
</script>


<form on:submit|preventDefault={addTask}>
    <input bind:value={taskInput} placeholder="Enter text to reverse" />
    <button type="submit">Reverse</button>
</form>

{#each tasks as task}
    <!-- Display task results -->
{/each}

