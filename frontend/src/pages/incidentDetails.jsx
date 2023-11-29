import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

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
      //setDamage(response.data.result[0].Damage);
      //setAffectedSytems(response.data.result[0].Affected_systems);
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

  // Fetch incident details from API or props

  return (
    <div className="p-4 ml-20">
      <p>Incident Details Page</p>
      <h1 className="mb-4 mb-10">Incident name: {incidentName}</h1>
      <p>Issued date: {dateReported}</p>
      <p>Issued time: {timeReported}</p>
      {/* Faculty Member Side */}
      <div className="mb-8 flex">
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-3 text-orange-200">
            Faculty Member
          </h2>
          {/* <p>
            <span className="font-bold">Incident Name:</span>
            <span className="font-normal ml-2">{incidentName}</span>
          </p> */}
          <p>
            <span className="font-bold">Incident Date:</span>
            <span className="font-normal ml-2">{incidentDate}</span>
          </p>
          <p>
            <span className="font-bold">Incident Time:</span>
            <span className="font-normal ml-2">{incidentTime}</span>
          </p>
          <p>
            <span className="font-bold">Incident Location:</span>
            <span className="font-normal ml-2">{incidentLocation}</span>
          </p>
          <p>
            <span className="font-bold">Incident Type:</span>
            <span className="font-normal ml-2">{incidentType}</span>
          </p>
          <p>
            <span className="font-bold">Other Incident Type:</span>
            <span className="font-normal ml-2">{otherIncidentType}</span>
          </p>
          <p>
            <span className="font-bold">Description:</span>
            <span className="font-normal ml-2">{description}</span>
          </p>
          <p>
            <span className="font-bold">Reporter's ID:</span>
            <span className="font-normal ml-2">{userInfo}</span>
          </p>
          <div className="incident-image">
            <img src={media} alt="Photo of incident" />
          </div>
        </div>
        {/* Incident Handler Side */}
        <div className="w-1/2 ml-20">
          <h2 className="text-2xl font-bold mb-3 text-blue-200">
            Incident Handler
          </h2>
          <p>
            <span className="font-bold">Response Description:</span>
            <span className="font-normal ml-2">{reponseDescription}</span>
          </p>
          <p>
            <span className="font-bold">Criticality:</span>
            <span className="font-normal ml-2">{criticality}</span>
          </p>
          <p>
            <span className="font-bold">Affected Hosts:</span>
            <span className="font-normal ml-2">{affectedHosts}</span>
          </p>
          <p>
            <span className="font-bold">IP Address:</span>
            <span className="font-normal ml-2">{IPAddress}</span>
          </p>
          <p>
            <span className="font-bold">Source IP:</span>
            <span className="font-normal ml-2">{sourceIP}</span>
          </p>
          <p>
            <span className="font-bold">Communication Host:</span>
            <span className="font-normal ml-2">{comHost}</span>
          </p>
          <p>
            <span className="font-bold">Other Application:</span>
            <span className="font-normal ml-2">{otherApp}</span>
          </p>
          <p>
            <span className="font-bold">Impact Assessment:</span>
            <span className="font-normal ml-2">{impactAssessment}</span>
          </p>
          <p>
            <span className="font-bold">Action Taken:</span>
            <span className="font-normal ml-2">{actionTaken}</span>
          </p>
          <p>
            <span className="font-bold">Planned Action:</span>
            <span className="font-normal ml-2">{plannedAction}</span>
          </p>
          <p>
            <span className="font-bold">Additional Notes:</span>
            <span className="font-normal ml-2">{additionalNotes}</span>
          </p>
          <p>
            <span className="font-bold">Handler ID:</span>
            <span className="font-normal ml-2">{handlerID}</span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          <Link to={"/response-form/" + lastPart}>Complete Response Form</Link>
        </button>
      </form>
    </div>
  );
};

export default IncidentDetails;
