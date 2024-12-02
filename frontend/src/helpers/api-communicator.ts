import axios from "axios"; // Importing axios for HTTP requests.

// Function to log in a user by sending email and password to the backend.
export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password }); // Sending POST request to login endpoint.
  
  if (res.status !== 200) {
    // If the response status is not 200 (success), throw an error.
    throw new Error("Unable to login");
  }

  const data = await res.data; // Extracting data from the response.
  return data; // Returning user data.
};

// Function to sign up a new user by sending name, email, and password.
export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password }); // Sending POST request to signup endpoint.
  
  if (res.status !== 201) {
    // If the response status is not 201 (created), throw an error.
    throw new Error("Unable to Signup");
  }

  const data = await res.data; // Extracting data from the response.
  return data; // Returning user data.
};

// Function to check the authentication status of the user.
export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status"); // Sending GET request to check auth status.
  
  if (res.status !== 200) {
    // If the response status is not 200 (success), throw an error.
    throw new Error("Unable to authenticate");
  }

  const data = await res.data; // Extracting data from the response.
  return data; // Returning auth status.
};

// Function to send a chat message.
export const sendChatRequest = async (message: string) => {
  const res = await axios.post("/chat/new", { message }); // Sending POST request to send a chat message.
  
  if (res.status !== 200) {
    // If the response status is not 200 (success), throw an error.
    throw new Error("Unable to send chat");
  }

  const data = await res.data; // Extracting data from the response.
  return data; // Returning chat response.
};

// Function to retrieve all chats for the user.
export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats"); // Sending GET request to fetch all chats.
  
  if (res.status !== 200) {
    // If the response status is not 200 (success), throw an error.
    throw new Error("Unable to fetch chats");
  }

  const data = await res.data; // Extracting data from the response.
  return data; // Returning list of chats.
};

// Function to delete all chats for the user.
export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete"); // Sending DELETE request to remove all chats.
  
  if (res.status !== 200) {
    // If the response status is not 200 (success), throw an error.
    throw new Error("Unable to delete chats");
  }

  const data = await res.data; // Extracting data from the response.
  return data; // Returning deletion confirmation.
};

// Function to log out the user.
export const logoutUser = async () => {
  const res = await axios.get("/user/logout"); // Sending GET request to log out the user.
  
  if (res.status !== 200) {
    // If the response status is not 200 (success), throw an error.
    throw new Error("Unable to logout");
  }

  const data = await res.data; // Extracting data from the response.
  return data; // Returning logout confirmation.
};
