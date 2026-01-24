import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

/**
 * Authentication Store using Zustand
 * Manages global authentication state and actions across the application
 */
export const useAuthStore = create((set) => ({
    // State: Stores the authenticated user object (null if not authenticated)
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatinProfile: false,
    isCheckingAuth: true,
    isCheckingAuth: true,

    /**
     * checkAuth - Verifies if the user is authenticated
     * Makes an API call to check the current authentication status
     * Updates the authUser state with the response data
     */
    checkAuth: async () => {
        try {
            // Call the backend to verify authentication status
            const res = axiosInstance.get("/auth/check");
            // If successful, store the authenticated user data
            set({ authUser: res.data });
        } catch (error) {
            // If authentication check fails, log the error
            console.log(`Error checking auth: ${error}`);
            // Clear the authUser state
            set({ authUser: null });
        } finally {
            // Always set isCheckingAuth to false when done (success or failure)
            set({ isCheckingAuth: false })
        }
    }

}));
