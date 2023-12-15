import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Axios from "axios";
import Swal from "sweetalert2";
import PDF from "./PDF.jsx";

const ReportSummary = () => {
  const [incidentName, setIncidentName] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [otherIncidentType, setOtherIncidentType] = useState("");
  const [description, setDescription] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [incidentTime, setIncidentTime] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [userId, setUserId] = useState("");
  const [media, setMedia] = useState("");

  const handleSaveAsPDF = async () => {
    try {
      // Fetch incident details
      const response = await Axios.get("api/getIncidentDetails", {
        params: { ReportID: lastPart },
      });

      // Check if the request was successful
      if (response.data.success) {
        // Success message and redirection
        Swal.fire({
          title: "Success!",
          text: "Incident report submitted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Generate the content of the PDF
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0);
        doc.text("Information Security Incident Report", 15, 15);

        doc.setFontSize(14);

        // Add each line of information separately
        drawLabeledLine(doc, "Incident Name: ", incidentName, 20, 30);
        drawLabeledLine(doc, "Incident Type: ", incidentType, 20, 40);
        drawLabeledLine(doc, "Other Incident Type: ", otherIncidentType, 20, 50);
        drawLabeledLine(doc, "Incident Description: ", description, 20, 60);
        drawLabeledLine(doc, "Incident Date: ", incidentDate, 20, 70);
        drawLabeledLine(doc, "Incident Time: ", incidentTime, 20, 80);
        drawLabeledLine(doc, "Incident Location: ", incidentLocation, 20, 90);
        drawLabeledLine(doc, "Incident Reported by: ", userId, 20, 100);

        // Move to a new line for media upload
        doc.text("Media Uploaded:", 20, 110);

        if (media) {
          // Assuming `media` is the base64 data of the image
          doc.addImage(media, "JPEG", 20, 120, 50, 50);
        }

        doc.save("incident_summary.pdf");
      } else {
        // Handle the case where the request was not successful
        Swal.fire({
          title: "Error!",
          text: "Failed to fetch incident details. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle other errors as needed
    }
  };

  // Helper function to draw labeled line
  const drawLabeledLine = (doc, label, value, x, y) => {
    const lineHeight = 10;
    const lineWidth = 90;
    doc.text(`${label}`, x, y);
    doc.setLineWidth(0.5);
    doc.line(x + lineWidth + 5, y + lineHeight / 2, x + 35, y + lineHeight / 2);
    doc.text(value, x + lineWidth + 5, y + lineHeight);
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
    <>
      <div>
        <h1 className="mt-10 mb-4 mb-10">Incident name: {incidentName}</h1>
        {/* Removed dateReported and timeReported references */}
        <div className="mb-8 flex">
          <div className="w-1/2">
            <h2 className="text-2xl font-bold ml-10 mb-3 text-orange-200">
              Faculty Member
            </h2>
            <p className="ml-10 mb-3">
              <span className="font-bold">Incident Date:</span>
              <span className="font-normal ml-2 mb-5">{incidentDate}</span>
            </p>
            <p className="ml-10 mb-3">
              <span className="font-bold">Incident Time:</span>
              <span className="font-normal ml-2">{incidentTime}</span>
            </p>
            <p className="ml-10 mb-3">
              <span className="font-bold">Incident Location:</span>
              <span className="font-normal ml-2">{incidentLocation}</span>
            </p>
            <p className="ml-10 mb-3">
              <span className="font-bold">Incident Type:</span>
              <span className="font-normal ml-2">{incidentType}</span>
            </p>
            <p className="ml-10 mb-3">
              <span className="font-bold">Other Incident Type:</span>
              <span className="font-normal ml-2">{otherIncidentType}</span>
            </p>
            <p className="ml-10 mb-3">
              <span className="font-bold">Description:</span>
              <span className="font-normal ml-2">{description}</span>
            </p>
            <p className="ml-10 mb-3">
              <span className="font-bold">Reporter's ID:</span>
              <span className="font-normal ml-2">{userId}</span>
            </p>
            <div className="incident-image ml-10 mb-3">
              <img src={media} alt="Photo of incident" />
            </div>
          </div>
          <button type="button" onClick={handleSaveAsPDF}>
            Save as PDF
          </button>
        </div>
        <PDF />
      </div>
    </>
  );
};

export default ReportSummary;
