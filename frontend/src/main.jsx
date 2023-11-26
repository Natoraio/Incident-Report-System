import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import UserMain from "./pages/facultyMember/userMain";
import ErrorPage from "./pages/errorPage";
import Login from "./pages/login";
import ReportForm from "./pages/facultyMember/reportForm";
import { Navigate } from "react-router-dom";
import ReportProgress from "./pages/facultyMember/reportProgress";
import ReportSummary from "./pages/facultyMember/reportSummary";
import ResponseForm from "./pages/incidentHandler/responseForm";
import HandlerMain from "./pages/incidentHandler/handlerMain";
import IncidentInsights from "./pages/incidentHandler/incidentInsights";
import IncidentDetails from "./pages/incidentDetails";
import IncidentHistory from "./pages/incidentHistory";

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
    path: "/response-form/:id",
    element: <ResponseForm />,
  },
  {
    path: "/handler-home",
    element: <HandlerMain />,
  },
  {
    path: "/incident-insights",
    element: <IncidentInsights />,
  },
  {
    path: "/incident-details/:id",
    element: <IncidentDetails />,
  },
  {
    path: "/incident-history",
    element: <IncidentHistory />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
