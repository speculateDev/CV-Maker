import { createContext, useContext, useReducer } from "react";

const CvContext = createContext();

const initialState = {
  personal: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    languages: ["English"],
    image: null,
  },

  education: [],
  experience: [],
  skills: [],
  tools: [],
  customSections: [],
  isGeneric: true,
};

function reducer(state, action) {
  switch (action.type) {
    case "update_personal":
      return { ...state, personal: action.payload };

    case "reset_personal":
      return { ...state, personal: initialState.personal };

    case "update_experience":
      return {
        ...state,
        experience: state.experience.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        ),
      };

    case "remove_experience":
      return {
        ...state,
        experience: state.experience.filter((exp) => exp.id !== action.payload),
      };

    case "add_experience":
      return { ...state, experience: [...state.experience, action.payload] };

    case "update_education":
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? action.payload : edu
        ),
      };

    case "remove_education":
      return {
        ...state,
        education: state.education.filter((exp) => exp.id !== action.payload),
      };

    case "add_education":
      return { ...state, education: [...state.education, action.payload] };

    case "update_skills":
      return { ...state, skills: action.payload };

    case "update_tools":
      return { ...state, tools: action.payload };

    case "add_section":
      return {
        ...state,
        customSections: [
          ...state.customSections,
          { ...action.payload, items: [] },
        ],
      };

    case "add_section_item":
      return {
        ...state,
        customSections: state.customSections.map((section) =>
          section.id === action.payload.sectionId
            ? { ...section, items: [...section.items, action.payload.item] }
            : section
        ),
      };

    case "update_section_item":
      return {
        ...state,
        customSections: state.customSections.map((section) =>
          section.id === action.payload.sectionId
            ? {
                ...section,
                items: section.items.map((item) =>
                  item.id === action.payload.itemId
                    ? { ...item, ...action.payload.item }
                    : item
                ),
              }
            : section
        ),
      };

    case "remove_section_item":
      return {
        ...state,
        customSections: state.customSections.map((section) =>
          section.id === action.payload.sectionId
            ? {
                ...section,
                items: section.items.filter(
                  (item) => item.id !== action.payload.itemId
                ),
              }
            : section
        ),
      };

    case "use_generic":
      return { ...state, isGeneric: true };

    case "use_user":
      return { ...state, isGeneric: false };

    default:
      return state;
  }
}

export function CvProvider({ children }) {
  const [cvState, dispatch] = useReducer(reducer, initialState);

  return (
    <CvContext.Provider value={{ cvState, dispatch }}>
      {children}
    </CvContext.Provider>
  );
}

export function useCv() {
  const context = useContext(CvContext);
  if (!context)
    throw new Error("The useCv context is being called outside the provider");
  return context;
}
