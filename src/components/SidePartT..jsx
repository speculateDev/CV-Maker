import { useEffect } from "react";
import { useCv } from "../context/CvContext";

function SidePart() {
  const {} = useCv();

  return (
    <div className="side-part">
      <div className="profile-img"></div>

      <div className="section">
        <p className="section__side-p">yourmail@gmail.com</p>
        <p className="section__side-p">+33 6 33 33 33 33</p>
        <p className="section__side-p">Lisbon</p>
      </div>

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

      <div className="section">
        <h3 className="section__side-h">Tools & Technologies</h3>
        <p className="section__side-w">
          Figma, Sketch, Protopie, Framer, Invision, Abstract, Zeplin, Google
          Analytics...
        </p>
      </div>

      <div className="section">
        <h3 className="section__side-h">Other Skills</h3>
        <p className="section__side-w">HTML, CSS, jQuery</p>
      </div>

      <div className="section">
        <h3 className="section__side-h">Languages</h3>
        <p className="section__side-w">French (native)</p>
        <p className="section__side-w">English (Professionnal)</p>
      </div>

      <div className="section">
        <h3 className="section__side-h">Social</h3>
        <p className="section__side-w">yoursite.com</p>
        <p className="section__side-w">linkedin.com/in/yourname</p>
        <p className="section__side-w">dribbble.com/yourname</p>
      </div>
    </div>
  );
}

export default SidePart;
