// Import React for building components
import React from "react"; 

// Import TextField component from Material UI for customized input field
import TextField from "@mui/material/TextField";

// Define the types of props that CustomizedInput component will accept
type Props = {
  name: string; // Name attribute for the input field
  type: string; // Type attribute (e.g., "text", "email", "password") for the input field
  label: string; // Label text to display for the input field
};

// Define the CustomizedInput component that takes in Props
const CustomizedInput = (props: Props) => {
  return (
    <TextField
      // Adds margin to space the input field
      margin="normal"
      
      // Style the label color to white
      InputLabelProps={{ style: { color: "white" } }}

      // Set name of input field from the props
      name={props.name} 
      
      // Set label for the input field from the props
      label={props.label} 
      
      // Set input field type from the props
      type={props.type} 

      // Customize the input field's appearance with styles
      InputProps={{
        style: {
          width: "400px", // Set the width of the input field
          borderRadius: 10, // Round the corners of the input field
          fontSize: 20, // Increase the font size of the input text
          color: "white", // Set input text color to white
        },
      }}
    />
  );
};

// Export CustomizedInput component for use in other parts of the app
export default CustomizedInput;
