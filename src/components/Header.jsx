import { useCv } from "../context/CvContext";

const generic = {
  name: "Your name",
  whoami: "Senior Product Designer",
};

function Header() {
  const { cvState } = useCv();

  const { personal, isGeneric } = cvState;

  return (
    <h1 className="main-header">
      <span className="first">{`${
        personal.firstName ? personal.firstName : "Your"
      } ${personal.lastName ? personal.lastName : "name"}`}</span>
      {isGeneric && <span className="last">Senior Product Designer</span>}
    </h1>
  );
}

export default Header;
