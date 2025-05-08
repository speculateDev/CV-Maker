import Accordion from "../components/Accordion";
import PersonalForm from "../components/PersonalForm";
import ExperienceForm from "../components/ExperienceForm";
import {
  BicepsFlexed,
  Briefcase,
  Eye,
  GraduationCap,
  Hammer,
  Layers2,
  Plus,
  Signature,
  UserRound,
} from "lucide-react";
import EducationForm from "../components/EducationForm";
import { Toaster } from "react-hot-toast";
import SkillForm from "../components/SkillForm";
import ToolsForm from "../components/ToolsForm";
import { useState } from "react";
import Modal from "../components/Modal";
import { useCv } from "../context/CvContext";
import CustomForm from "../components/CustomForm";
import { NavLink, useNavigate } from "react-router-dom";

const fixedSections = [
  {
    id: "item-1",
    title: "Personal Details",
    icon: <UserRound size="45" />,
    content: <PersonalForm />,
  },
  {
    id: "item-2",
    title: "Experience",
    icon: <Briefcase size="45" />,
    content: <ExperienceForm />,
  },
  {
    id: "item-3",
    title: "Education",
    icon: <GraduationCap size="45" />,
    content: <EducationForm />,
  },
  {
    id: "item-4",
    title: "Skills",
    icon: <BicepsFlexed size="45" />,
    content: <SkillForm />,
  },
  {
    id: "item-5",
    title: "Tools & Technologies",
    icon: <Hammer size="45" />,
    content: <ToolsForm />,
  },
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const { cvState, dispatch } = useCv();
  const navigate = useNavigate();

  console.log(cvState.customSections);

  function handlePreview(isGeneric) {
    if (isGeneric) dispatch({ type: "use_generic" });
    else dispatch({ type: "use_user" });

    navigate("/preview");
  }

  return (
    <>
      <div className="maker__container">
        <div className="container">
          <Accordion>
            {fixedSections.map((section) => (
              <Accordion.Item key={section.id} name={section.id}>
                <Accordion.Trigger opens={section.id}>
                  {section.icon}
                  {section.title}
                </Accordion.Trigger>
                <Accordion.Content name={section.id}>
                  {section.content}
                </Accordion.Content>
              </Accordion.Item>
            ))}

            {cvState.customSections?.map((section, i) => (
              <Accordion.Item key={section.id} name={section.id}>
                <Accordion.Trigger opens={section.id}>
                  <Layers2 size={40} />
                  {section.title}
                </Accordion.Trigger>
                <Accordion.Content name={section.id}>
                  <CustomForm section_id={section.id} sectionData={section} />
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion>

          {showModal && <Modal setShowModal={setShowModal} />}

          <div className="flex-end mt-1 gap-2">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-modal"
            >
              <Plus />
            </button>

            <button
              onClick={() => handlePreview(false)}
              className="btn btn-generic"
            >
              <Eye />
            </button>

            <button
              className="btn btn-generic"
              onClick={() => handlePreview(true)}
            >
              <Signature />
            </button>
          </div>
        </div>
      </div>

      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            backgroundColor: "#1f1f1f",
            fontSize: "16px",
            color: "#fff",
            border: "2px solid #2e2e2e",
            fontFamily: "'Inter', sans-serif",
          },
        }}
      />
    </>
  );
}

export default App;
