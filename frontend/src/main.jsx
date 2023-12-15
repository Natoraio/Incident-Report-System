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
import ResponseForm from "./pages/incidentHandler/responseForm";
import HandlerMain from "./pages/incidentHandler/handlerMain";
import IncidentDetails from "./pages/incidentDetails";
import IncidentHistory from "./pages/facultyMember/incidentHistory";
import HistoryStatistics from "./pages/incidentHandler/historyStatistics";
import PDFFile from "./pages/PDFFile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />, // for unknown routes
  },
  {
    path: "/login",
    element: <Login />,
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
    path: "/incident-progress/:id",
    element: <ReportProgress />,
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
    path: "/incident-history/:id",
    element: <IncidentHistory />,
  },
  {
    path: "/history-statistics",
    element: <HistoryStatistics />,
  },
  {
    path: "/pdf-file",
    element: <PDFFile />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
