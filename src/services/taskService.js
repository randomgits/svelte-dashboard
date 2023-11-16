export async function reverseTextTask(taskInput) {
    try {
        const response = await fetch('/api/add_task/reverse_text', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskInput })
        });

        console.log("Response received:", response); // Log the response object

        if (!response.ok) {
            console.error("Response not OK, status:", response.status); // Log non-ok responses
            return null;
        }

        try {
            const data = await response.json();
            console.log("Response data:", data); // Log the response data
            return data;
        } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError); // Log JSON parsing errors
            return null;
        }
    } catch (error) {
        console.error("Error in reverseTextTask:", error); // Log fetch errors
        return null;
    }
}



export async function summarizeTextTask(text) {
    return fetch('/api/summarize_text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
}
