import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { GlobalStore } from "./stateManagement/GlobalStore";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { initializeFileTypeIcons } from "@fluentui/react-file-type-icons";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { UserProvider } from "providers/UserProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

initializeIcons();
initializeFileTypeIcons();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FluentProvider theme={webLightTheme}>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <GlobalStore>
            <App />
          </GlobalStore>
        </UserProvider>
      </QueryClientProvider>
    </FluentProvider>
  </React.StrictMode>
);
