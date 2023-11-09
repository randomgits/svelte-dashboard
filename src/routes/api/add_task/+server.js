import { json } from '@sveltejs/kit';

// Simulate a database operation to decrement credits
// This is just for demonstration; you'll replace this with your actual database logic.
let credits = 4;  // This would actually be retrieved from a database per user session

export async function POST({ request }) {
    const { text, user_id } = await request.json();
    
    // Your logic to handle the task addition and credits decrement goes here.
    const reversedText = text.split('').reverse().join('');

    // Decrement the credits (you would actually update this in the database)
    credits--;

    return json({ 
        message: "Text reversed successfully", 
        reversedText,
        credits: credits // Return the updated credits
    });
}
