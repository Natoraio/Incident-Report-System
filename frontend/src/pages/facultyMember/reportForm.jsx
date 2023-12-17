import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { KJUR } from "jsrsasign";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import withAuth from "../../components/withAuth";
import { Link } from "react-router-dom";
// import "./reportForm.css";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* { 
margin: 0;
padding: 0;
}

body {
  width: 100%;
  align-items: center;
  flex-direction: column;
  align-items: stretch;
  padding-top: 50px;
  padding-left: 100px;
  padding-right: 100px;
  font-size: 20px;
  font-family: 'Kanit', sans-serif;
}
`;

const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 30px;

`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  // align-items: center;
  gap: 20px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  gap: auto;
  margin: 10px;

  input,
  textarea,
  select {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 70vw;
  }

  textarea {
    height: 100px;
  }
`;
const SubmitButton = styled.button`
  width: 20%;
  align-self: center;
  padding: 20px;
  background-color: #390656;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 100px;
`;

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
      const userId = decodedToken.payloadObj.userID;
      setUserId(userId);
      console.log(decodedToken.payloadObj);
    } else {
      navigate("/login");
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
    if (incidentType === "13" && !otherIncidentType.trim()) {
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
    const maxSize = 550 * 550; // 550x550px

    if (file.size > maxSize) {
      Swal.fire(
        "Error!",
        "Image dimension must be less than 550 x 550px.",
        "error"
      );
      e.target.value = ""; // Clear the input
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        // When the reader is done reading the file, the result attribute contains the Base64 string
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file); // Read the file as a data URL (Base64 format)
    }
  };

  return (
    <>
      <GlobalStyle />

      <button>
        <Link to="/home">◀ Back to home</Link>
      </button>

      <div className="report-container">
        <h1>Incident Report Form</h1>
        <p className="intro-text">
          To report a new incident into the system, please fill in all the
          fields. Image file upload is optional but very helpful!
        </p>
        <Content>
          <div className="details-blah">
            <Form onSubmit={handleSubmit}>
              <Label>
                Incident Name:
                <input
                  type="text"
                  value={incidentName}
                  onChange={(e) => setIncidentName(e.target.value)}
                />
              </Label>
              <Label>
                Incident Type:
                <select
                  className="p-3 rounded"
                  value={incidentType}
                  onChange={(e) => setIncidentType(e.target.value)}
                >
                  <option value="">Select Incident Type</option>
                  <option value="1">Compromised systems / applications</option>
                  <option value="2">Comprimised user credentials</option>
                  <option value="3">Network attacks</option>
                  <option value="4">Malware</option>
                  <option value="5">Lost equipment / theft</option>
                  <option value="6">Physical break-in</option>
                  <option value="7">Social engineering</option>
                  <option value="9">Law enforcement request</option>
                  <option value="10">Policy violation</option>
                  <option value="11">Legal / copyright violation</option>
                  <option value="12">PII data breach / data exposure</option>
                  <option value="13">Other</option>
                </select>
                {incidentType === "13" && (
                  <input
                    className="p-3 rounded"
                    type="text"
                    onChange={(e) => setOtherIncidentType(e.target.value)}
                    value={otherIncidentType}
                  />
                )}
              </Label>
              <Label>
                Incident Description:
                <textarea
                  className="rounded w-96"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Label>
              <Label>
                Incident Date:
                <input
                  type="date"
                  value={incidentDate}
                  onChange={(e) => setIncidentDate(e.target.value)}
                />
              </Label>
              <Label>
                Incident Time:
                <input
                  type="time"
                  value={incidentTime}
                  onChange={(e) => setIncidentTime(e.target.value)}
                />
              </Label>
              <Label>
                Incident Location:
                <input
                  type="text"
                  value={incidentLocation}
                  onChange={(e) => setIncidentLocation(e.target.value)}
                />
              </Label>
              <Label>
                Incident Reported by:
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </Label>
              <Label>
                Media Upload:
                <input
                  id="file"
                  name="image"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  onChange={handleImageChange}
                />
              </Label>
              <br />
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <SubmitButton type="submit" onClick={handleSubmit}>
                Submit
              </SubmitButton>
              </div>
            </Form>
          </div>
        </Content>
      </div>
    </>
  );
};

export default withAuth(ReportForm, "Staff");
