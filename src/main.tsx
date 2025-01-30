import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./index.css";
import { routes } from "./routes";
import Web3Provider from "./components/providers/web3.provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Web3Provider>
      <RouterProvider router={routes} />
    </Web3Provider>
  </StrictMode>
);
