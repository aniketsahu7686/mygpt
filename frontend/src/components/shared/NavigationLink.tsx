// Import the 'Link' component from 'react-router-dom' for navigation
import { Link } from "react-router-dom";

// Define the type for props accepted by the NavigationLink component
type Props = {
    to: string;        // URL path for the link
    bg: string;        // Background color for the link
    text: string;      // Display text for the link
    textColor: string; // Text color for the link
    onClick?: () => Promise<void>; // Optional click handler that returns a promise
};

// Functional component to create a styled navigation link
const NavigationLink = (props: Props) => {
  return (
    // Render the Link component with the path specified in props.to
    <Link 
    className="nav-link"
      to={props.to}
      // Apply inline styling for background and text color based on props
      style={{ background: props.bg, color: props.textColor }}
      // Optionally handle onClick if it's passed in props
      onClick={props.onClick}
    >
      {props.text} {/* Display the text passed in props */}
    </Link>
  );
};

// Export the NavigationLink component for use in other parts of the application
export default NavigationLink;
