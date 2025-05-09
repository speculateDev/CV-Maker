import { useCv } from "../context/CvContext";
import Header from "./Header";
import { genericData } from "../utils/constants";
import { useEffect, useState } from "react";
import { format } from "date-fns";

function MainPart() {
  const { cvState } = useCv();
  const { isGeneric } = cvState;

  const { experience, education, customSections, personal } = isGeneric
    ? genericData
    : cvState;

  return (
    <div className="main-part">
      <Header />

      {/* Experience Section */}
      {experience && experience.length > 0 && (
        <>
          <p className="section__sub-h">Experience</p>
          {experience.map((exp) => (
            <div className="section" key={exp.id}>
              <h2 className="section__h-1">{exp.jobTitle}</h2>
              <h3 className="section__h-2">{exp.companyName}</h3>
              <p className="section__h-3">
                {format(new Date(exp.dateFrom), "MMM yyyy")} -{" "}
                {exp.dateTo.toLowerCase() === "present"
                  ? "Present"
                  : format(new Date(exp.dateTo), "MMM yyyy")}
                , {exp.city}
              </p>
              <p className="section__description">{exp.roleDescription}</p>
            </div>
          ))}
        </>
      )}

      {/* Education Section */}
      {education && education.length > 0 && (
        <>
          <p className="section__sub-h">Education</p>
          {education.map((edu) => (
            <div className="section" key={edu.id}>
              <h2 className="section__h-1">{edu.degree}</h2>
              <h3 className="section__h-2">{edu.schoolName}</h3>
              <p className="section__h-3">
                {format(new Date(edu.dateFrom), "yyyy")} -{" "}
                {edu.dateTo.toLowerCase() === "present"
                  ? "Present"
                  : format(new Date(edu.dateTo), "yyyy")}
                , {edu.city}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Custom Sections */}
    </div>
  );
}

export default MainPart;
