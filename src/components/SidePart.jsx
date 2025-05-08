import { useCv } from "../context/CvContext";
import { genericData } from "../utils/constants";

function SidePart() {
  const { cvState } = useCv();
  const { isGeneric } = cvState;

  const { personal, tools, skills, customSections } = isGeneric
    ? genericData
    : cvState;

  const imgStyle = {
    backgroundImage: `url(${
      isGeneric ? "/profile.png" : personal.image?.imgUrl || ""
    })`,
  };

  return (
    <div className="side-part">
      <div style={imgStyle} className="profile-img"></div>

      {/* Personal details */}
      <div className="section">
        {personal.email && <p className="section__side-p">{personal.email}</p>}
        {personal.phone && (
          <p className="section__side-p">{"+" + personal.phone}</p>
        )}
        {personal.address && (
          <p className="section__side-p">{personal.address}</p>
        )}
      </div>

      {/* Side custom section */}
      {isGeneric && (
        <div className="section">
          <h3 className="section__side-h">Industry Knowledge</h3>
          <p className="section__side-p">Product Design</p>
          <p className="section__side-p">User Interface</p>
          <p className="section__side-p">User Experience</p>
          <p className="section__side-p">Interaction Design</p>
          <p className="section__side-p">Wireframing</p>
          <p className="section__side-p">Rapid Prototyping</p>
          <p className="section__side-p">design Research</p>
        </div>
      )}

      {/* Tools */}
      {tools && tools.length > 0 && (
        <div className="section">
          <h3 className="section__side-h">Tools & Technologies</h3>
          <p className="section__side-w">{tools.join(", ")}</p>
        </div>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="section">
          <h3 className="section__side-h">Skills</h3>
          <p className="section__side-w">{skills.join(", ") + "..."}</p>
        </div>
      )}

      {/* Languages */}
      <div className="section">
        <h3 className="section__side-h">Languages</h3>

        {personal.languages.map((lang) => (
          <p key={lang} className="section__side-w">
            {lang}
          </p>
        ))}
      </div>

      {isGeneric && (
        <div className="section">
          <h3 className="section__side-h">Social</h3>
          <p className="section__side-w">yoursite.com</p>
          <p className="section__side-w">linkedin.com/in/yourname</p>
          <p className="section__side-w">dribbble.com/yourname</p>
        </div>
      )}

      {customSections?.length > 0 &&
        customSections.map((section) => (
          <div key={section.id} className="section">
            <h3 className="section__side-h">{section.title}</h3>
            {section.items.map((item) => (
              <div key={item.id}>
                {section.inpType === "single" ? (
                  <p className="section__side-p">
                    {item[section.inpValues.single]}
                  </p>
                ) : (
                  <p className="section__side-w">{item.tags?.join(", ")}</p>
                )}
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default SidePart;
