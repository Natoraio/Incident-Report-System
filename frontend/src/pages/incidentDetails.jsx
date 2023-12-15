import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
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

  return (
    <div className="p-4 ml-20">
      <h1 className="mt-10 ml-10 mb-4 mb-10 text-3xl font-bold">
        Incident name: {incidentName}
      </h1>
      <p className="ml-10">Issued date: {dateReported}</p>
      <p className="ml-10 mb-10">Issued time: {timeReported}</p>
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

    </div>
  );
};

export default IncidentDetails;
