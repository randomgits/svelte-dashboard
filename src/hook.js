export async function handle({ request, resolve }) {
  const response = await resolve(request);

  // Additional logic to check user authentication
  if (!request.locals.user && isProtectedRoute(request.path)) {
    return {
      status: 302,
      headers: {
        location: "/login",
      },
    };
  }

  return response;
}

function isProtectedRoute(path) {
  const protectedRoutes = ["/dashboard", "/settings", "/profile"]; // Update as needed
  return protectedRoutes.includes(path);
}
