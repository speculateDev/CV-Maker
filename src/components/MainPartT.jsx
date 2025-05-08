import Header from "./Header";

function MainPart() {
  return (
    <div className="main-part">
      <Header />

      <div className="section">
        <p className="section__sub-h">Experience</p>
        <h2 className="section__h-1">Senior UI/UX Product Designer</h2>
        <h3 className="section__h-2">Entreprise name</h3>
        <p className="section__h-3">Aug 2018 - Present - 1 year, Paris</p>
        <p className="section__description">
          Directly collaborated with CEO and Product team to prototype, design
          and deliver the UI and UX experience with a lean design process:
          research, design, test, and iterate
        </p>
      </div>

      <div className="section">
        <h2 className="section__h-1">UI/UX Product Designer</h2>
        <h3 className="section__h-2">Entreprise name</h3>
        <p className="section__h-3">Aug 2013 - Aug 2018 - 5 years, Paris</p>
        <p className="section__description">
          Lead the UI design with accountability of the design system,
          collaborated with product and development teams on core projects to
          improve product interfaces and experiences.
        </p>
      </div>

      <div className="section">
        <h2 className="section__h-1">UI Designer</h2>
        <h3 className="section__h-2">Entreprise name</h3>
        <p className="section__h-3">Aug 2013 - Aug 2018 - 5 years, Paris</p>
        <p className="section__description">
          Designed mobile UI applications for Orange R&D departement, BNP
          Paribas, La Poste, Le Cned...
        </p>
      </div>

      <div className="section">
        <h2 className="section__h-1">Graphic Designer</h2>
        <h3 className="section__h-2">Entreprise name</h3>
        <p className="section__h-3">Aug 2010 - Jul 2012 - 2 years, Paris</p>
        <p className="section__description">
          Lead the UI design with accountability of the design system,
          collaborated with product and development teams on core projects to
          improve product interfaces and experiences.
        </p>
      </div>

      <div className="section">
        <p className="section__sub-h">Education</p>
        <h2 className="section__h-1">Bachelor European in Graphic Design</h2>
        <h3 className="section__h-2">School name</h3>
        <p className="section__h-3">2009 - 2010, Bagnolet</p>
      </div>

      <div className="section">
        <h2 className="section__h-1">
          BTS Communication Visuelle option Multimédia
        </h2>
        <h3 className="section__h-2">School name</h3>
        <p className="section__h-3">2007 - 2009, Bagnolet</p>
      </div>
    </div>
  );
}

export default MainPart;
