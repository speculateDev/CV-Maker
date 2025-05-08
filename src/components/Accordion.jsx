import { ChevronUp } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";

const AccordionContext = createContext();

function Accordion({ children }) {
  const [openItems, setOpenItem] = useState(["item-1"]);

  return (
    <AccordionContext.Provider value={{ openItems, setOpenItem }}>
      <div className="accordion">{children}</div>
    </AccordionContext.Provider>
  );
}

function AccordionItem({ name, children }) {
  const { openItems } = useContext(AccordionContext);
  const isOpen = openItems.includes(name);

  return (
    <div className="accordion__item" data-state={isOpen}>
      {children}
    </div>
  );
}

function AccordionTrigger({ opens, children }) {
  const { openItems, setOpenItem } = useContext(AccordionContext);

  const isOpen = openItems.includes(opens);

  return (
    <button
      className="accordion__trigger"
      onClick={() => {
        setOpenItem((prev) =>
          isOpen ? prev.filter((item) => item !== opens) : [...prev, opens]
        );
      }}
    >
      <span>{children}</span>
      <ChevronUp className={`${isOpen ? "open" : ""}`} />
    </button>
  );
}

function AccordionContent({ name, children }) {
  const { openItems } = useContext(AccordionContext);

  const isOpen = openItems.includes(name);

  return (
    <div
      style={{
        height: isOpen ? "auto" : 0,
        overflow: "hidden",
        transition: "height 300ms ease",
      }}
      className={`accordion__content ${isOpen ? "open" : ""}`}
    >
      {isOpen && children}
    </div>
  );
}

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export default Accordion;
