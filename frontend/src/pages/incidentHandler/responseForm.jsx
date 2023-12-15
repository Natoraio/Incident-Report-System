import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { KJUR } from "jsrsasign";
import { useNavigate } from "react-router-dom";
import withAuth from "../../components/withAuth";

const ResponseForm = () => {
  const navigate = useNavigate();

  const urlPath = window.location.pathname;
  const parts = urlPath.split("/");
  const lastPart = parts.pop() || parts.pop();

  const [handlerId, setHandlerId] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      const handlerId = decodedToken.payloadObj.userID;
      setHandlerId(handlerId);
      console.log("Handler ID: " + handlerId);
      //   console.log(decodedToken.payloadObj);
    }
  }, []);

  const [imageBase64, setImageBase64] = useState("");
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When the reader is done reading the file, the result attribute contains the Base64 string
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL (Base64 format)
    }
  };

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
    Axios.post("http://localhost:8800/api/submitHandlerReport", {
      responseDescription: reponseDescription,
      criticalityLevel: criticalityLevel,
      affectedHosts: affectedHosts,
      IPAddress: IPAddress,
      sourceIP: sourceIP,
      comHost: comHost,
      otherApp: otherApp,
      impactAssessment: impactAssessment,
      actionTaken: actionTaken,
      plannedAction: plannedAction,
      additionalNotes: additionalNotes,
      media: imageBase64,
      handlerID: handlerId,
      incidentID: lastPart,
    })
      .then((response) => {
        // Handle success response
        console.log(response.data);
        if (response.data.success) {
          Swal.fire({
            title: "Success!",
            text: "Report submitted successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate("/handler-home");
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to submit report",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
        Swal.fire("Error", "Failed to submit report", "error");
      });
  };

  return (
    <div className="container mx-auto flex">
      <div className="w-1/2">
        <h1 className="text-2xl font-bold mb-4">Incident Response Form</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mb-4 flex items-center">
            <span className="w-40">Response Description:</span>
            <textarea
              className="rounded w-96 p-2"
              value={reponseDescription}
              onChange={(e) => setResponseDescription(e.target.value)}
            />
          </label>
          <label className="mb-4 flex items-center">
            <span className="w-40">Criticality Level:</span>
            <select
              className="p-2 rounded"
              value={criticalityLevel}
              onChange={(e) => setCriticalityLevel(e.target.value)}
            >
              <option value="4">Select Criticality</option>
              <option value="3">Low</option>
              <option value="2">Medium</option>
              <option value="1">High</option>
            </select>
          </label>
          <label className="mb-4 flex items-center">
            <span className="w-40">Affected Hosts:</span>
            <input
              type="text"
              value={affectedHosts}
              onChange={(e) => setAffectedHosts(e.target.value)}
              className="rounded p-2"
            />
          </label>
          <label className="mb-4 flex items-center">
            <span className="w-40">IP Address:</span>
            <input
              type="text"
              value={IPAddress}
              onChange={(e) => setIPAddress(e.target.value)}
              className="rounded p-2"
            />
          </label>
          <label className="mb-4 flex items-center">
            <span className="w-40">Source IP:</span>
            <input
              type="text"
              value={sourceIP}
              onChange={(e) => setSourceIP(e.target.value)}
              className="rounded p-2"
            />
          </label>
          <label className="mb-4 flex items-center">
            <span className="w-40">Communication Host:</span>
            <input
              type="text"
              value={comHost}
              onChange={(e) => setComHost(e.target.value)}
              className="rounded p-2"
            />
          </label>
          <label className="mb-4 flex items-center">
            <span className="w-40">Other Application:</span>
            <input
              type="text"
              value={otherApp}
              onChange={(e) => setOtherApp(e.target.value)}
              className="rounded p-2"
            />
          </label>
        </form>
      </div>
      <div className="w-1/2">
        <label className="mb-4 flex items-center">
          <span className="w-40">Impact Assessment:</span>
          <input
            type="text"
            value={impactAssessment}
            onChange={(e) => setImpactAssessment(e.target.value)}
            className="rounded p-2"
          />
        </label>
        <label className="mb-4 flex items-center">
          <span className="w-40">Action Taken:</span>
          <input
            type="text"
            value={actionTaken}
            onChange={(e) => setActionTaken(e.target.value)}
            className="rounded p-2"
          />
        </label>
        <label className="mb-4 flex items-center">
          <span className="w-40">Planned Action:</span>
          <input
            type="text"
            value={plannedAction}
            onChange={(e) => setPlannedAction(e.target.value)}
            className="rounded p-2"
          />
        </label>
        <label className="mb-4 flex items-center">
          <span className="w-40">Additional Notes:</span>
          <textarea
            className="rounded w-96 p-2"
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
          />
        </label>
        <label>
          Media Upload:
          <input
            id="file"
            name="image"
            type="file"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
          />
        </label>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default withAuth(ResponseForm, "Incident handler");
