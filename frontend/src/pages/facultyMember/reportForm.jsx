import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { KJUR } from "jsrsasign";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const [userId, setUserId] = useState("");
  const [media, setMedia] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      const decodedToken = KJUR.jws.JWS.parse(token);
      const userId = decodedToken.payloadObj.userId;
      setUserId(userId);
      console.log(decodedToken.payloadObj);
    }
  }, [userId]);
  const validateForm = () => {
    if (!incidentName.trim()) {
      Swal.fire("Error!", "Please enter the incident name.", "error");
      return false;
    }
    if (!incidentType.trim()) {
      Swal.fire("Error!", "Please select the incident type.", "error");
      return false;
    }
    if (incidentType === "other" && !otherIncidentType.trim()) {
      Swal.fire("Error!", "Please specify the other incident type.", "error");
      return false;
    }
    if (!description.trim()) {
      Swal.fire("Error!", "Please enter the incident description.", "error");
      return false;
    }
    if (!incidentLocation.trim()) {
      Swal.fire("Error!", "Please enter the incident location.", "error");
      return false;
    }
    if (!userId) {
      Swal.fire("Error!", "Please enter the user ID.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    // Handle form submission logic here
    Axios.post("http://localhost:8800/api/submitForm", {
      incidentName: incidentName,
      incidentType: incidentType,
      otherIncidentType: otherIncidentType,
      description: description,
      incidentStatus: "Pending",
      incidentLocation: incidentLocation,
      incidentDate: incidentDate,
      incidentTime: incidentTime,
      media: imageBase64,
      userID: userId,
    }).then((response) => {
      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Incident report submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/home");
      } else {
        Swal.fire({
          title: "Error!",
          text: "Incident report submission failed. Please try again or contact admin@siit.tu.ac.th",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

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
            <option value="Compromised systems / applications">
              Compromised systems / applications
            </option>
            <option value="Comprimised user credentials">
              Comprimised user credentials
            </option>
            <option value="Network attacks">Network attacks</option>
            <option value="Malware">Malware</option>
            <option value="Lost equipment / theft">
              Lost equipment / theft
            </option>
            <option value="Physical break-in">Physical break-in</option>
            <option value="Social engineering">Social engineering</option>
            <option value="Law enforcement request">
              Law enforcement request
            </option>
            <option value="Policy violation">Policy violation</option>
            <option value="Legal / copyright violation">
              Legal / copyright violation
            </option>
            <option value="PII data breach / data exposure">
              PII data breach / data exposure
            </option>
            <option value="other">Other</option>
          </select>
          {incidentType == "other" && (
            <input
              className="p-3 rounded"
              type="text"
              onChange={(e) => setOtherIncidentType(e.target.value)}
              value={otherIncidentType}
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
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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
        <br />
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
