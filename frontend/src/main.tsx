// Import StrictMode from React to help identify potential problems in an application
import { StrictMode } from 'react';

// Import createRoot to enable React 18's new concurrent rendering API
import { createRoot } from 'react-dom/client';

// Import global styles for the application
import './index.css';

// Import the main App component that serves as the root of the component tree
import App from './App.tsx';

// Import Material UI's createTheme and ThemeProvider for custom theming
import { createTheme, ThemeProvider } from '@mui/material';

// Import BrowserRouter to enable routing within the application
import { BrowserRouter } from "react-router-dom";

// Import AuthProvider to provide authentication context to the application
import { AuthProvider } from './context/AuthContext.tsx';

// Import Toaster from react-hot-toast to display toast notifications
import { Toaster } from "react-hot-toast";

// Import axios library for making HTTP requests
import axios from "axios"; 

// Set the default base URL for all axios requests to save specifying the full URL each time
axios.defaults.baseURL = "https://localhost:5000/api/v1"; 

// Configure axios to include credentials (like cookies) with requests, often required for authentication
axios.defaults.withCredentials = true;

// Define a custom Material UI theme with font styling and color for typography
const theme = createTheme({
  typography: {
    fontFamily: "Roboto Slab,serif", // Set the font family to "Roboto Slab"
    allVariants: { color: "white" }, // Set color for all typography variants to white
  },
});

// Create a root and render the application with various providers and context
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Provide authentication context to all components within the application */}
    <AuthProvider>
      {/* Enable routing capabilities for the application */}
      <BrowserRouter>
        {/* Apply the custom Material UI theme to the entire application */}
        <ThemeProvider theme={theme}>
          {/* Display toast notifications at the top-right corner of the screen */}
          <Toaster position="top-right" />
          {/* Render the main App component */}
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
