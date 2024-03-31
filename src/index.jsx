import { createRoot } from 'react-dom/client';
import "./index.css";
import App from "./App";
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from "./context/AuthProvider";
import theme from "./theme";

const root = createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AuthProvider>
);
