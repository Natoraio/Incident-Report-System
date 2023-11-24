import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import UserMain from "./pages/facultyMember/userMain";
import ErrorPage from "./pages/errorPage";
import AdminMain from "./pages/adminMain";
import Login from "./pages/login";
import ReportForm from "./pages/facultyMember/reportForm";
import { Navigate } from "react-router-dom";
import ReportProgress from "./pages/facultyMember/reportProgress";
import ReportSummary from "./pages/facultyMember/reportSummary";
import AnalystMain from "./pages/incidentAnalyst/analystMain";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />, // for unknown routes
  },
  {
    path: "/home",

    element: <UserMain />,
  },
  {
    path: "/admin",
    element: <AdminMain />,
  },
  {
    path: "/report",
    element: <ReportForm />,
  },
  {
    path: "/incident-progress",
    element: <ReportProgress />,
  },
  {
    path: "/report-summary",
    element: <ReportSummary />,
  },
  {
    path: "/analyst-home",
    element: <AnalystMain />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
