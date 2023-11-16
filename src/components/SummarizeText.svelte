<script>
    import { summarizeTextTask } from '../services/taskService.js';
    let summary = '';
    let text = '';

    async function summarize() {
        if (text.trim() !== '') {
            const response = await summarizeTextTask(text);
            if (response.ok) {
                const result = await response.json();
                summary = result.summary;
                // Additional handling if needed
            } else {
                // Handle error
            }
        }
    }
</script>

<!-- HTML content remains the same -->
