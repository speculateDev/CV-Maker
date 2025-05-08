import { Download } from "lucide-react";
import MainPart from "../components/MainPart";
import SidePart from "../components/SidePart";
import html2pdf from "html2pdf.js";
import { jsPDF } from "jspdf";

function CvPreview() {
  function handleDownload() {
    const element = document.querySelector("#cv");
    html2pdf(element, {
      margin: 10,
      filename: "cv.pdf",
      image: {
        type: "jpeg",
        quality: 1,
      },
      html2canvas: {
        scale: 4,
        letterRendering: true,
        useCORS: true,
        logging: false,
        imageTimeout: 0, // No timeout for images
        allowTaint: true, // Allow tainted canvas if CORS is an issue
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: false, // Disable compression for better quality
      },
    });
  }

  return (
    <div className="border-box relative">
      <button className="btn btn-download" onClick={handleDownload}>
        <Download />
      </button>
      <main id="cv" className="prev__container">
        <MainPart />
        <SidePart />
      </main>
    </div>
  );
}

export default CvPreview;
