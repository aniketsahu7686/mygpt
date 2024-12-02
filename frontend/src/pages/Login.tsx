// Import necessary libraries and components
import React, { useEffect } from "react"; // Import React and useEffect for side effects
import { IoIosLogIn } from "react-icons/io"; // Import login icon from react-icons library
import { Box, Typography, Button } from "@mui/material"; // Import Box, Typography, and Button components from MUI for layout and styling
import CustomizedInput from "../components/shared/CustomizedInput"; // Import custom input component
import { toast } from "react-hot-toast"; // Import toast for notifications
import { useAuth } from "../context/AuthContext"; // Import custom hook for authentication
import { useNavigate } from "react-router-dom"; // Import useNavigate to programmatically navigate


// Define the Login component
const Login = () => {
  const navigate = useNavigate(); // Hook for navigation
  const auth = useAuth(); // Retrieve authentication functions from AuthContext

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh on form submission
    const formData = new FormData(e.currentTarget); // Capture form data
    const email = formData.get("email") as string; // Get email from form data
    const password = formData.get("password") as string; // Get password from form data
    try {
      toast.loading("Signing In", { id: "login" }); // Show loading toast notification
      await auth?.login(email, password); // Call login function from auth context
      toast.success("Signed In Successfully", { id: "login" }); // Show success toast notification
    } catch (error) {
      console.log(error); // Log error to console if login fails
      toast.error("Signing In Failed", { id: "login" }); // Show error toast notification
    }
  };

  // Redirect to chat page if user is already logged in
  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat"); // Redirect to /chat if user is authenticated
    }
  }, [auth, navigate]); // Depend on auth changes

  // Render login form and layout
  return (
    <Box width={"100%"} height={"100%"} display="flex" flex={1}> {/* Outer Box covering the whole viewport */}
      {/* Left side image box only visible on larger screens */}
      <Box padding={8} mt={8} display={{ md: "flex", sm: "none", xs: "none" }}>
        <img src="airobot.png" alt="Robot" style={{ width: "400px" }} /> {/* Robot image */}
      </Box>
      
      {/* Right side form box, centered */}
      <Box
        display={"flex"}
        flex={{ xs: 1, md: 0.5 }}
        justifyContent={"center"}
        alignItems={"center"}
        padding={2}
        ml={"auto"}
        mt={16}
      >
        <form
          onSubmit={handleSubmit} // Attach handleSubmit function to form
          style={{
            margin: "auto",
            padding: "30px",
            boxShadow: "10px 10px 20px #000",
            borderRadius: "10px",
            border: "none",
          }}
        >
          {/* Form content box, centered vertically and horizontally */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h4" // Title with h4 variant
              textAlign="center"
              padding={2}
              fontWeight={600}
            >
              Login
            </Typography>
            
            {/* Email input field */}
            <CustomizedInput type="email" name="email" label="Email" />
            {/* Password input field */}
            <CustomizedInput type="password" name="password" label="Password" />
            
            {/* Login button with icon */}
            <Button
              type="submit" // Submit button to trigger form submission
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: "400px",
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": {
                  bgcolor: "white",
                  color: "black",
                },
              }}
              endIcon={<IoIosLogIn />} // Login icon at the end of button
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login; // Export Login component for use in other parts of the app
