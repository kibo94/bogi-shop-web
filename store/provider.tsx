"use client";
import { ReactNode } from "react"; // Import React types
import { Provider } from "react-redux"; // Import the Provider component from Redux
import store from "./store";

// Define the Props type for the Providers component
interface ProvidersProps {
  children: ReactNode; // The children prop will be a ReactNode (can be any valid React element)
}

// Define the Providers component using the Props type
export function Providers({ children }: ProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
