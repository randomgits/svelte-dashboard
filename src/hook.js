// src/hooks.js
export async function handle({ request, resolve }) {
    const response = await resolve(request);
  
    // If the user is not authenticated and is accessing a protected route, redirect to login
    if (!request.locals.user && isProtectedRoute(request.path)) {
      return {
        status: 302,
        headers: {
          location: '/login'
        }
      };
    }
  
    return response;
  }
  
  function isProtectedRoute(path) {
    const protectedRoutes = ['/credits', '/dashboard', '/profile']; // Add more as needed
    return protectedRoutes.includes(path);
  }
  