import React, { useState } from "react";
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {
  const [loading, setLoading] = useState(false);

  const handleSaveAsPDF = async () => {
    try {
      // Set loading to true to disable the button during PDF generation
      setLoading(true);

      // Call the async toPdf function to generate the PDF
      const pdfBlob = await ref.current.toPdf();

      // Create a Blob URL for the generated PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new window or tab
      window.open(pdfUrl);
    } catch (error) {
      console.error("Error generating PDF:", error);
      // Handle error as needed
    } finally {
      // Set loading back to false when PDF generation is complete
      setLoading(false);
    }
  };

  return (
    <>
      <div className="reportSummary" ref={ref}>
        Hi
      </div>
      <Pdf targetRef={ref} filename="Incident_Summary.pdf">
        {({ toPdf }) => (
          <button disabled={loading} onClick={handleSaveAsPDF}>
            Save as PDF
          </button>
        )}
      </Pdf>
    </>
  );
};

export default PDF;
