import { json } from '@sveltejs/kit';

// Update this URL to point to your backend's root URL
const BACKEND_ROOT_URL = 'https://cloud-run-microservice-template-python-razcvdqurq-uc.a.run.app';

export async function GET({ params }) {
    const { task_id } = params;

    console.log(`Fetching task status for ID: ${task_id}`);

    const response = await fetch(`${BACKEND_ROOT_URL}/task_status/${task_id}`);

    if (!response.ok) {
        console.error(`Error fetching task status: ${response.status}`);
        return new Response(null, { status: response.status });
    }

    const data = await response.json();
    console.log(`Task status data:`, data);

    return json(data);
}