// utils/session.js
import { parse } from 'cookie';

export function getUserSession(req) {
  // Parse the cookies from the request
  const cookies = parse(req.headers.cookie || '');

  // Check if the session cookie is present
  if (cookies.session) {
    // Parse the session from the session cookie
    const session = JSON.parse(cookies.session);

    // Check if the session exists on the server
    // This part depends on how you handle sessions in your application
    // For this example, we'll just check if the session in the cookie matches the session stored in a global variable
    if (global.session && global.session.username === session.username && global.session.loggedInAt === session.loggedInAt) {
      return session;
    }
  }

  return null;
}