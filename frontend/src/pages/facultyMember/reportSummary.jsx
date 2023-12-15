import React from "react";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import PDFFile from "../PDFFile.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";

const ReportSummary = () => {
  return (
    
    <div>
      {/* Display the incident summary */}
      <h1>Incident Summary</h1>
      {/* Display the incident information */}
      {/* ... */}
  <PDFDownloadLink document={<PDFFile />} fileName="incident_summary.pdf">
        {({ blob, url, loading, error }) => (loading ? <button>Loading Document..</button> : <button>Save as PDF</button>)}
      </PDFDownloadLink>
      {/* Button to save the summary as a PDF */}
      {/*<button onClick={handleSaveAsPDF}>Save as PDF</button>*/}
    </div>

  );
};

export default ReportSummary;