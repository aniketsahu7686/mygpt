import {
    ReactNode,        // Type for the children prop in components.
    createContext,    // Function to create a new context.
    useContext,       // Hook to consume a context in functional components.
    useEffect,        // Hook for managing side effects.
    useState,         // Hook for managing state in functional components.
  } from "react";
  import {
    checkAuthStatus,  // API function to check if the user is authenticated.
    loginUser,        // API function to log in a user.
    logoutUser,       // API function to log out a user.
    signupUser,       // API function to sign up a user.
  } from "../helpers/api-communicator";
  
  // Type definition for a User object.
  type User = {
    name: string;
    email: string;
  };
  
  // Type definition for the UserAuth context.
  type UserAuth = {
    isLoggedIn: boolean;                     // Indicates if a user is logged in.
    user: User | null;                       // The currently logged-in user or null.
    login: (email: string, password: string) => Promise<void>; // Function to log in a user.
    signup: (name: string, email: string, password: string) => Promise<void>; // Function to sign up a user.
    logout: () => Promise<void>;             // Function to log out a user.
  };
  
  // Creating the authentication context with an initial value of null.
  const AuthContext = createContext<UserAuth | null>(null);
  
  // Component to provide authentication context to the app.
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);  // State to store the logged-in user.
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status.
  
    useEffect(() => {
      // Effect to check the user's authentication status when the component mounts.
      async function checkStatus() {
        const data = await checkAuthStatus(); // Call the API to check auth status.
        if (data) {
          setUser({ email: data.email, name: data.name }); // Set user data if authenticated.
          setIsLoggedIn(true);                            // Update the login status.
        }
      }
      checkStatus(); // Invoke the function.
    }, []);
  
    // Function to log in a user.
    const login = async (email: string, password: string) => {
      const data = await loginUser(email, password); // Call the login API.
      if (data) {
        setUser({ email: data.email, name: data.name }); // Set user data on success.
        setIsLoggedIn(true);                            // Update the login status.
      }
    };
  
    // Function to sign up a user.
    const signup = async (name: string, email: string, password: string) => {
      const data = await signupUser(name, email, password); // Call the signup API.
      if (data) {
        setUser({ email: data.email, name: data.name }); // Set user data on success.
        setIsLoggedIn(true);                            // Update the login status.
      }
    };
  
    // Function to log out a user.
    const logout = async () => {
      await logoutUser();      // Call the logout API.
      setIsLoggedIn(false);    // Reset login status.
      setUser(null);           // Clear the user data.
      window.location.reload(); // Reload the page to clear session data.
    };
  
    // Value object containing the context data and functions.
    const value = {
      user,
      isLoggedIn,
      login,
      logout,
      signup,
    };
  
    // Wrapping the children with the context provider and passing the value.
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
  // Custom hook to consume the AuthContext.
  export const useAuth = () => useContext(AuthContext);
  