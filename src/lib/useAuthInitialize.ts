'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { apiClient } from '@/lib/axios';

/**
 * Hook to initialize auth state from server session
 * This runs once on mount and checks if user is authenticated
 */
export function useAuthInitialize() {
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Prevent multiple initializations
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeAuth = async () => {
      try {
        
        // Try to fetch user session from backend
        const response = await apiClient.get('/api/session');
        const data = response.data;
        
        if (data.user) {
          useAuthStore.setState({
            user: data.user,
            status: 'authenticated',
            initialized: true,
          });
        } else {
          useAuthStore.setState({
            user: null,
            status: 'idle',
            initialized: true,
          });
        }
      } catch (error) {
        useAuthStore.setState({
          user: null,
          status: 'idle',
          initialized: true,
        });
      }
    };

    initializeAuth();
  }, []); // Empty dependency array - runs once on mount
}

