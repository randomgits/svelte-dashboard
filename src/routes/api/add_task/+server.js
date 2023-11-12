import { json } from '@sveltejs/kit';

// Assuming the backend URL is set up correctly in your environment
//const BACKEND_URL = 'http://localhost:8080/add_task';
const BACKEND_URL = 'https://cloud-run-microservice-template-python-razcvdqurq-uc.a.run.app/add_task';

// Simulate a database operation to decrement credits
// This is just for demonstration; you'll replace this with your actual database logic.
let credits = 4;  // This would actually be retrieved from a database per user session

export async function POST({ request }) {
    const { text, user_id } = await request.json();
    
    // Send the text to the backend for processing
    const backendResponse = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text: text })
    });

    const backendData = await backendResponse.json();

    // Include the task_id in the response
    return json({ 
        message: backendData.message, 
        reversedText: backendData.reversed_text,
        credits: credits, // Return the updated credits
        task_id: backendData.task_id // Include the task_id
    });
}
