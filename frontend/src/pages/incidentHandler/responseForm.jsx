import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import { KJUR } from "jsrsasign";
import { useNavigate } from "react-router-dom";
import withAuth from "../../components/withAuth";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * { 
  margin: 0;
  padding: 0;
  }
  
  body {
    align-items: center;
    flex-direction: column;
    align-items: stretch;
    // padding-top: 50px;
    padding-left: 100px;
    padding-right: 100px;
    font-size: 24px;
    font-family: 'Kanit', sans-serif;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  gap: 50px;
`;

const LeftContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 50%;
`;

const RightContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  max-width: 50%;
`;

const FormLabel = styled.label`
  margin-bottom: 8px;
  font-size: 20px;
  display: flex;
  align-items: center;
`;

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
    if (criticalityLevel === "4" || criticalityLevel === "") {
      Swal.fire("Error!", "Please select a criticality level.", "error");
    } else {
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
    }
  };

  return (
    <>
      <GlobalStyle />
      <button>
        <Link to="/home">◀ Back to home</Link>
      </button>
      <h1>Incident Response Form</h1>
      <h2>
        To report a new incident into the system, please fill in all the fields.
        Image file upload is optional, but is very helpful!
      </h2>
      <div className="container mx-auto flex">
        <Content>
          <LeftContent>
            <form onSubmit={handleSubmit} className="flex flex-col">
              <FormLabel>
                <span className="w-40">Response Description:</span>
                <textarea
                  className="rounded w-100 p-2"
                  value={reponseDescription}
                  onChange={(e) => setResponseDescription(e.target.value)}
                />
              </FormLabel>
              <FormLabel>
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
              </FormLabel>
              <FormLabel>
                <span className="w-40">Affected Hosts:</span>
                <input
                  type="text"
                  value={affectedHosts}
                  onChange={(e) => setAffectedHosts(e.target.value)}
                  className="rounded p-2"
                />
              </FormLabel>
              <FormLabel>
                <span className="w-40">IP Address:</span>
                <input
                  type="text"
                  value={IPAddress}
                  onChange={(e) => setIPAddress(e.target.value)}
                  className="rounded p-2"
                />
              </FormLabel>
              <FormLabel>
                <span className="w-40">Source IP:</span>
                <input
                  type="text"
                  value={sourceIP}
                  onChange={(e) => setSourceIP(e.target.value)}
                  className="rounded p-2"
                />
              </FormLabel>
              <FormLabel>
                <span className="w-40">Computer Host:</span>
                <input
                  type="text"
                  value={comHost}
                  onChange={(e) => setComHost(e.target.value)}
                  className="rounded p-2"
                />
              </FormLabel>
              <FormLabel>
                <span className="w-40">Other Application:</span>
                <input
                  type="text"
                  value={otherApp}
                  onChange={(e) => setOtherApp(e.target.value)}
                  className="rounded p-2"
                />
              </FormLabel>
            </form>
          </LeftContent>
          <RightContent>
            <FormLabel>
              <span className="w-40">Impact Assessment:</span>
              <textarea
                type="text"
                value={impactAssessment}
                onChange={(e) => setImpactAssessment(e.target.value)}
                className="rounded w-100 p-2"
              />
            </FormLabel>
            <FormLabel>
              <span className="w-40">Action Taken:</span>
              <textarea
                type="text"
                value={actionTaken}
                onChange={(e) => setActionTaken(e.target.value)}
                className="rounded w-100 p-2"
              />
            </FormLabel>
            <FormLabel>
              <span className="w-40">Planned Action:</span>
              <textarea
                type="text"
                value={plannedAction}
                onChange={(e) => setPlannedAction(e.target.value)}
                className="rounded w-100 p-2"
              />
            </FormLabel>
            <FormLabel>
              <span className="w-40">Additional Notes:</span>
              <textarea
                className="rounded w-100 p-2"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
              />
            </FormLabel>
            <FormLabel>
              Media Upload:
              <input
                id="file"
                name="image"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
              />
            </FormLabel>
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </RightContent>
        </Content>
      </div>
    </>
  );
};

export default withAuth(ResponseForm, "Incident handler");
