import { user } from '$lib/auth.js';

export async function checkAuth(session) {
    let currentUser = null;

    if (session && session.user) {
        currentUser = session.user;
    }

    return currentUser;
}