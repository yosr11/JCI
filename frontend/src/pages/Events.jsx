import * as React from "react";
import { siteData } from "../data/siteData.js";
import PageTitle from "../components/PageTitle.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

export default function Events() {
  const eventsRef = useScrollReveal();

  return (
    <>
      <PageTitle
        title="Actions & Events"
        subtitle="Forums, projects, community actions, and development initiatives by JCI Dar Chaabane El Fehri."
      />
      <section className="sec" ref={eventsRef}>
        <div className="event-categories">
          {siteData.rubriquesEvenements.map((rubrique, index) => (
            <section
              key={rubrique.titre}
              className={`event-category reveal${index % 2 ? " event-category--alt" : ""}`}
            >
              <header className="event-category-heading">
                <span className="event-category-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2>{rubrique.titre}</h2>
                  <p>{rubrique.sousTitre}</p>
                </div>
              </header>
              <div className="action-panels">
                {rubrique.projets.map((projet) => (
                  <details key={projet.titre} className="action-panel">
                    <summary>
                      {projet.image && (
                        <img src={projet.image} alt="" loading="lazy" />
                      )}
                      <span className="action-panel-title">{projet.titre}</span>
                      <span className="action-panel-toggle" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <div className="action-panel-details">
                      <p>{projet.texte}</p>
                      {projet.partenaires && (
                        <p className="event-project-partners">
                          <strong>In collaboration with:</strong>{" "}
                          {projet.partenaires}
                        </p>
                      )}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
      {siteData.evenements?.length > 0 && (
        <section className="sec alt upcoming-events">
          <h2>Upcoming events</h2>
          <ul className="events">
            {siteData.evenements.map((event) => (
              <li key={event.titre}>
                <time>{event.date}</time>
                <div>
                  <h3>{event.titre}</h3>
                  <p>{event.lieu}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
