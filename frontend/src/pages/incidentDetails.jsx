import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const IncidentDetails = () => {
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
  const [criticalityLevel, setCriticalityLevel] = useState("");
  const [affectedHosts, setAffectedHosts] = useState("");
  const [IPAddress, setIPAddress] = useState("");
  const [sourceIP, setSourceIP] = useState("");
  const [comHost, setComHost] = useState("");
  const [otherApp, setOtherApp] = useState("");
  const [impactAssessment, setImpactAssessment] = useState("");
  const [actionTaken, setActionTaken] = useState("");
  const [plannedAction, setPlannedAction] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here
    // Redirect user to responseForm page
  };

  // Fetch incident details from API or props

  return (
    <div>
      <h1>Incident Details</h1>
      {/* Display incident details here */}
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <Link to={"/response-form"}>Complete Response Form</Link>
        </button>
      </form>
    </div>
  );
};

export default IncidentDetails;
