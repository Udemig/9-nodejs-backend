import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={client}>
    <App />
    <ToastContainer autoClose={2500} hideProgressBar />
  </QueryClientProvider>,
);
