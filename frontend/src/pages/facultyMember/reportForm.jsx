import React, { useState } from "react";
import Swal from "sweetalert2";

const ReportForm = () => {
  const [incidentName, setIncidentName] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [otherIncidentType, setOtherIncidentType] = useState("");
  const [description, setDescription] = useState("");
  // const [damage, setDamage] = useState("");
  // const [affectedSystems, setAffectedSytems] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [media, setMedia] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When the reader is done reading the file, the result attribute contains the Base64 string
        setMedia(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL (Base64 format)
    }
  };

  return (
    <div>
      <h1>Incident Report Form</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label>
          Incident Name:
          <input
            type="text"
            value={incidentName}
            onChange={(e) => setIncidentName(e.target.value)}
          />
        </label>
        <label>
          Incident Type:
          <select
            className="p-3 rounded"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
          >
            <option value="">Select Incident Type</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
            <option value="data">Data Security</option>
            <option value="malware">Malware and Viruses</option>
            <option value="phySecurity">Physical Security</option>
            <option value="other">Other Please specify</option>
          </select>
          {incidentType === "other" && (
            <input
              className="p-3 rounded"
              type="text"
              value={otherIncidentType}
              onChange={(e) => setOtherIncidentType(e.target.value)}
            />
          )}
        </label>
        <br />
        <label>
          Incident Description:
          <textarea
            className="rounded w-96"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        {/* <label>
          Resulting Damage:
          <textarea
            value={damage}
            onChange={(e) => setDamage(e.target.value)}
          />
        </label>
        <label>
          Affected Systems/Devices:
          <textarea
            className="p-3"
            value={affectedSystems}
            onChange={(e) => setAffectedSytems(e.target.value)}
          />
        </label> */}
        <label>
          Incident Date:
          <input
            type="date"
            value={incidentDate}
            onChange={(e) => setIncidentDate(e.target.value)}
          />
        </label>
        <label>
          Incident Time:
          <input
            type="time"
            value={incidentTime}
            onChange={(e) => setIncidentTime(e.target.value)}
          />
        </label>
        <label>
          Incident Location:
          <input
            type="text"
            value={incidentLocation}
            onChange={(e) => setIncidentLocation(e.target.value)}
          />
        </label>
        <label>
          Incident Reported by:
          <input
            type="text"
            value={userInfo}
            onChange={(e) => setUserInfo(e.target.value)}
          />
        </label>
        <label>
          Media Upload:
          <input
            id="file"
            name="image"
            type="file"
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleImageChange}
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

export default ReportForm;
