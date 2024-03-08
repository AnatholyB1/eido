// utils/session.js
import { parse } from 'cookie';
import Cookies from 'js-cookie';

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
      
    return session;

  }

  return null;
}

export function logOut() {
    // Clear the session
    
    // Clear the session cookie
    const cookie = serialize('session', '', {
        maxAge: -1,
        path: '/',
    });
    
    // Set the cookie in the response header
    res.setHeader('Set-Cookie', cookie);
}

export function isConnected() {
  console.log(Cookies.get('session'))
  return !!Cookies.get('session');
}


export function isAdmin() {
  console.log(JSON.parse(Cookies.get('session') || '{}').username === 'admin')
 return JSON.parse(Cookies.get('session') || '{}').username === 'admin';
}