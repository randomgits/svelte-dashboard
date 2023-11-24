import { json } from '@sveltejs/kit';

const BACKEND_URL = 'https://cloud-run-microservice-template-python-razcvdqurq-uc.a.run.app/summarize_text';


export async function POST({ request }) {
    const { text } = await request.json();
    
    const backendResponse = await fetch(BACKEND_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text })
    });

    const backendData = await backendResponse.json();
    return json(backendData);
}
