import React from "react";
import ReactDOM from "react-dom";
import App from "@src/App";
import "./index.css";
import { GlobalStore } from "@providers/GlobalStoreProvider";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import { initializeFileTypeIcons } from "@fluentui/react-file-type-icons";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { UserProvider } from "@providers/UserProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

initializeIcons();
initializeFileTypeIcons();

const queryClient = new QueryClient();
const app = document.getElementById("root");

ReactDOM.render(
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
  </React.StrictMode>,
  app
);
