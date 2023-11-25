import React, { useState } from "react";
import Swal from "sweetalert2";

const ResponseForm = () => {
  const [media, setMedia] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  return (
    <div>
      <h1>Incident Response Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <br />
        <label>
          Response Description:
          <textarea
            className="rounded w-96"
            value={reponseDescription}
            onChange={(e) => setResponseDescription(e.target.value)}
          />
        </label>
        <label>
          Criticality Level
          <select
            className="p-3 rounded"
            value={criticalityLevel}
            onChange={(e) => setCriticalityLevel(e.target.value)}
          >
            <option value="">Select Criticality</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <label>
          Affected Hosts:
          <input
            type="text"
            value={affectedHosts}
            onChange={(e) => setAffectedHosts(e.target.value)}
          />
        </label>
        <br />
        <label>
          IP Address:
          <input
            type="text"
            value={IPAddress}
            onChange={(e) => setIPAddress(e.target.value)}
          />
        </label>
        <br />
        <label>
          Source IP:
          <input
            type="text"
            value={sourceIP}
            onChange={(e) => setSourceIP(e.target.value)}
          />
        </label>
        <br />
        <label>
          Communication Host:
          <input
            type="text"
            value={comHost}
            onChange={(e) => setComHost(e.target.value)}
          />
        </label>
        <br />
        <label>
          Other Application:
          <input
            type="text"
            value={otherApp}
            onChange={(e) => setOtherApp(e.target.value)}
          />
        </label>
        <br />
        <label>
          Impact Assessment:
          <input
            type="text"
            value={impactAssessment}
            onChange={(e) => setImpactAssessment(e.target.value)}
          />
        </label>
        <br />
        <label>
          Action Taken:
          <input
            type="text"
            value={actionTaken}
            onChange={(e) => setActionTaken(e.target.value)}
          />
        </label>
        <br />
        <label>
          Planned Action:
          <input
            type="text"
            value={plannedAction}
            onChange={(e) => setPlannedAction(e.target.value)}
          />
        </label>
        <br />
        <label>
          Additional Notes:
          <textarea
            className="rounded w-96"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
        </label>
        <label>
          Upload Media:
          <input
            type=".png, .jpg, .jpeg, .pdf"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
          />
        </label>
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResponseForm;
