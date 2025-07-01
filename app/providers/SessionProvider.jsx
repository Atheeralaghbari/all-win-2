// app/providers/SessionProvider.js
'use client';

import { createContext, useState, useEffect, useContext } from 'react';

// Define the shape of the context data
const SessionContext = createContext({
  user: null,
  isLoading: true,
});

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This function will run once when the component mounts.
    const fetchSession = async () => {
      try {
        // The browser automatically sends the httpOnly cookie with this request.
        const response = await fetch('/api/get-session');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, []); // The empty dependency array ensures this runs only once.

  return (
    <SessionContext.Provider value={{ user, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

// Create a custom hook for easy access to the session data
export const useSession = () => {
  return useContext(SessionContext);
};
