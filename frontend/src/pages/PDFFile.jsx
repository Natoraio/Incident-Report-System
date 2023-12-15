import React, { useEffect, useState } from "react";
import {
  View,
  Page,
  Text,
  Image,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import logo from "./logo-siit.png";
import IncidentDetails from "./incidentDetails";
import Axios from "axios";
import styled from "styled-components";

const styles = StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 5,
    paddingBottom: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  title: {
    color: "#7337A3",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 10,
    fontSize: 14,
    textAlign: "justify",
  },
  boldText: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    padding: 5,
    color: "white",
    backgroundColor: "#7337A3",
    fontWeight: "bold",
    fontSize: 14,
  },
  image: {
    alignSelf: "center",
    width: "150px",
    marginVertical: 15,
    marginHorizontal: 15,
  },
    labelText: {
    textAlign: "center",
    marginTop: 5,
    fontSize: 12,
    color: "grey",
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  section: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  severitySection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 12,
  },
  severityText: {
    marginRight: 10,
  },
});

const PDFFile = () => {
  const [incidentDetails, setIncidentDetails] = useState([]);

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

  return (
    <Document>
      <Page style={{ ...styles.body, backgroundColor: "#ffff" }}>
        <Text style={styles.header} fixed></Text>
        <Image style={styles.image} src={logo} />

        {/* Title Section */}
        <Text style={styles.title}>
          INFORMATION SECURITY INCIDENT REPORT SUMMARY
        </Text>

        {/* Main Content */}
        <Text style={styles.boldText}>INCIDENT INFORMATION</Text>
        <Text style={styles.text}>
          Incident Name: {incidentName}
          {"\n"}
          Issued Date: {dateReported}
          {"\n"}
          Issued Time: {timeReported}
        </Text>

        {/* Severity Level */}
        <View style={styles.section}>
          <View style={styles.severitySection}>
            <Text style={styles.severityText}> INCIDENT ASSESSMENT: </Text>
            <Text style={styles.severityText}>
              {criticality === "High"
                ? " Low Criticality"
                : "[ ] Low Criticality"}
            </Text>
            <Text style={styles.severityText}>
              {criticality === "Medium"
                ? "[X] Medium Criticality"
                : "[ ] Medium Criticality"}
            </Text>
            <Text style={styles.severityText}>
              {criticality === "Low"
                ? "[X] High Criticality"
                : "[ ] High Criticality"}
            </Text>
          </View>
        </View>

        {/* Faculty Member and Incident Handler Sections */}

        <Text style={styles.boldText}>FACULTY MEMBER</Text>
        <View style={styles.section}>
          <View style={styles.column}>
            <Text style={styles.text}>
              Incident Date: {incidentDate}
              {"\n"}
              Incident Time: {incidentTime}
              {"\n"}
              Incident Location: {incidentLocation}
              {"\n"}
              Incident Type: {incidentType}
              {"\n"}
              Other Incident Type : {otherIncidentType}
              {"\n"}
              Description: {description}
              {"\n"}
              Reporter's ID: {userInfo}
            </Text>
            <Image style={styles.image} src={media} alt="Reported Incident Photo" />
            <Text style={styles.labelText}>Reported Incident Photo</Text>
          </View>
        </View>
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>

      <Page
        style={{ ...styles.body, backgroundColor: "#ffff", marginTop: "50px" }}
      >
        <Text style={styles.boldText}>Incident Handler</Text>
        <Text style={styles.text}>
          Response Description: {reponseDescription}
          {"\n"}
          Criticality: {criticality}
          {"\n"}
          Affected Hosts: {affectedHosts}
          {"\n"}
          IP Address: {IPAddress}
          {"\n"}
          Source IP: {sourceIP}
          {"\n"}
          Communication Host: {comHost}
          {"\n"}
          Other Application: {otherApp}
          {"\n"}
          Impact Assessment: {impactAssessment}
          {"\n"}
          Action Taken: {actionTaken}
          {"\n"}
          Planned Action: {plannedAction}
          {"\n"}
          Additional Notes: {additionalNotes}
          {"\n"}
          Handler ID: {handlerID}
        </Text>

        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
};

export default PDFFile;
