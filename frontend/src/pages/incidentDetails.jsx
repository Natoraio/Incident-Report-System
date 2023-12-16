import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import styled, { createGlobalStyle } from "styled-components";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import PDFFile from "./PDFFile.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "./incidentDetails.css"

const IncidentDetails = () => {
  const urlPath = window.location.pathname;
  const parts = urlPath.split("/");
  const lastPart = parts.pop() || parts.pop();
  console.log(lastPart);
  const [dateReported, setDateReported] = useState("");
  const [timeReported, setTimeReported] = useState("");
  // Faculty Member Side
  const [userType, setUserType] = useState("");
  const [incidentName, setIncidentName] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [otherIncidentType, setOtherIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [damage, setDamage] = useState("");
  const [affectedSystems, setAffectedSytems] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [media, setMedia] = useState("");
  // Incident Handler Side
  const [reponseDescription, setResponseDescription] = useState("");
  const [criticality, setCriticality] = useState("");
  const [affectedHosts, setAffectedHosts] = useState("");
  const [IPAddress, setIPAddress] = useState("");
  const [sourceIP, setSourceIP] = useState("");
  const [comHost, setComHost] = useState("");
  const [otherApp, setOtherApp] = useState("");
  const [impactAssessment, setImpactAssessment] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [plannedAction, setPlannedAction] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [handlerID, setHandlerID] = useState("");

  const handleSubmit = () => {
    Axios.get("api/getIncidentDetails", {
      params: { ReportID: lastPart },
    }).then((response) => {
      console.log(response.data.incidentDetails);
    });
  };

  useEffect(() => {});

  useEffect(() => {
    Axios.get("http://localhost:8800/api/getIncidentDetails", {
      params: {
        incidentID: lastPart,
      },
    }).then((response) => {
      console.log(response.data.result[0]);
      setDateReported(response.data.result[0].dateReported.split("T")[0]);
      setTimeReported(response.data.result[0].timeReported);
      //Faculty Member
      setIncidentName(response.data.result[0].incidentName);
      setIncidentDate(
        new Date(response.data.result[0].dateOccur).toISOString().split("T")[0]
      );
      setIncidentTime(response.data.result[0].timeOccur);
      setIncidentLocation(response.data.result[0].location);
      setIncidentType(response.data.result[0].incidentTypeName);
      setOtherIncidentType(response.data.result[0].otherIncidentType);
      setDescription(response.data.result[0].description);
      setUserInfo(response.data.result[0].reporterUserID);
      setMedia(response.data.result[0].picture);

      //Handler
      setResponseDescription(response.data.result[0].responseDescription);
      setCriticality(response.data.result[0].criticality);
      setAffectedHosts(response.data.result[0].affectedHost);
      setIPAddress(response.data.result[0].IPAddress);
      setSourceIP(response.data.result[0].sourceIP);
      setComHost(response.data.result[0].computerHost);
      setOtherApp(response.data.result[0].otherApplication);
      setImpactAssessment(response.data.result[0].impactAssessment);
      setActionTaken(response.data.result[0].actionTaken);
      setPlannedAction(response.data.result[0].plannedAction);
      setAdditionalNotes(response.data.result[0].additionalNote);
      setHandlerID(response.data.result[0].handlerID);
    });
  }, []);

  const handleClick = () => {
    // Handle click event here
    console.log("Incident tab clicked");
    console.log(id);
  };

  const ResolveIndicent = () => {
    console.log("Incident resolved");
    Axios.post("http://localhost:8800/api/resolveIncident", {
      incidentID: id,
      handlerID: handlerID,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          console.log("Incident resolved");
          Swal.fire({
            title: "Success!",
            text: "Incident resolved!",
            icon: "success",
            confirmButtonText: "OK",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Axios Error:", error.response);
        Swal.fire({
          title: "Error!",
          text: "Failed to resolve incident",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };
  // Fetch incident details from API or props

  const GlobalStyle = createGlobalStyle`
  body {
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
`;

  const IncidentDetailsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    margin: 20px;
  `;

  const IncidentDetailsTitle = styled.h1`
    font-size: 2em;
    text-align: center;
    color: palevioletred;
  `;

  const IncidentDetailsContent = styled.div`
    padding: 20px;
    border: 1px solid gray;
    border-radius: 10px;
    width: 100%;
    max-width: 600px;
  `;

  const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-top: 10px;
  `;

  return (
    <div className="p-4 ml-20">
      <h1>Incident Details Page</h1>
      <h2 className="text-2xl font-bold mb-3 text-black-200">
        Incident name: {incidentName}
      </h2>
      <p>Issued date: {dateReported}</p>
      <p>Issued time: {timeReported}</p>
      {/* Faculty Member Side */}
      <div className="first-container mb-8 flex">
        <div className="second-container w-full">
          <h2 className="text-xl font-bold ml-10 mb-3 text-orange-600">
            Faculty Member
          </h2>
          <p className="ml-10 mb-3">
            <span className="font-bold">Incident Date:</span>{" "}
            <span className="text-gray-800">{incidentDate}</span>
          </p>
          <p className="ml-10 mb-3">
            <span className="font-bold">Incident Time:</span>{" "}
            <span className="text-gray-800">{incidentTime}</span>
          </p>
          <p className="ml-10 mb-3">
            <span className="font-bold">Incident Location:</span>{" "}
            <span className="text-gray-800">{incidentLocation}</span>
          </p>
          <p className="ml-10 mb-3">
            <span className="font-bold">Incident Type:</span>{" "}
            <span className="text-gray-800">{incidentType}</span>
          </p>
          <p className="ml-10 mb-3">
            <span className="font-bold">Other Incident Type:</span>{" "}
            <span className="text-gray-800">{otherIncidentType}</span>
          </p>
          <p className="ml-10 mb-3">
            <span className="font-bold">Description:</span>{" "}
            <span className="text-gray-800">{description}</span>
          </p>
          <p className="ml-10 mb-3">
            <span className="font-bold">Reporter's ID:</span>{" "}
            <span className="text-gray-800">{userInfo}</span>
          </p>
          <div className="incident-image ml-10 mb-3">
          <span className="font-bold mb-10">Incident picture/file: </span>{" "}
            <img src={media} alt="Photo of incident" className="max-w-full mt-10" />
          </div>
        </div>
        {/* Incident Handler Side */}
        <div className="second-container w-full ml-5">
          <h2 className="text-xl font-bold mb-3 text-blue-600">
            Incident Handler
          </h2>
          <p className="mb-3">
            <span className="font-bold">Response Description:</span>{" "}
            <span className="text-gray-800">{reponseDescription}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Criticality:</span>{" "}
            <span className="text-gray-800">{criticality}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Affected Hosts:</span>{" "}
            <span className="text-gray-800">{affectedHosts}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">IP Address:</span>{" "}
            <span className="text-gray-800">{IPAddress}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Source IP:</span>{" "}
            <span className="text-gray-800">{sourceIP}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Communication Host:</span>{" "}
            <span className="text-gray-800">{comHost}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Other Application:</span>{" "}
            <span className="text-gray-800">{otherApp}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Impact Assessment:</span>{" "}
            <span className="text-gray-800">{impactAssessment}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Action Taken:</span>{" "}
            <span className="text-gray-800">{actionTaken}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Planned Action:</span>{" "}
            <span className="text-gray-800">{plannedAction}</span>
          </p>
          <p className="mb-3">
            <span className="font-bold">Additional Notes:</span>{" "}
            <span className="text-gray-800">{additionalNotes}</span>
          </p>
          <p>
            <span className="font-bold">Handler ID:</span>{" "}
            <span className="text-gray-800">{handlerID}</span>
          </p>
        </div>
      </div>

      <div className="mt-4">
        <Link
          to={"/response-form/" + lastPart}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Complete Response Form
        </Link>
        <button
          className="incident-tab p-3 bg-orange-500 ml-2"
          onClick={ResolveIndicent}
        >
          Mark as Resolved
        </button>
        <PDFDownloadLink document={<PDFFile />} fileName="incident_summary.pdf">
          {({ blob, url, loading, error }) =>
            loading ? (
              <button>Loading Document..</button>
            ) : (
              <button>Save as PDF</button>
            )
          }
        </PDFDownloadLink>
      </div>
    </div>
  );
};

export default IncidentDetails;
