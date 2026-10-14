import * as React from "react";
import { siteData } from "../data/siteData.js";
import PageTitle from "../components/PageTitle.jsx";

export default function Partners() {
  return (
    <>
      <PageTitle
        title="Partners"
        subtitle="The organizations that support our projects."
      />
      <section className="sec">
        <div className="grid">
          {siteData.partenaires.map((partner) => (
            <div key={partner.nom} className="partner">
              <img src={partner.image} alt={`${partner.nom} logo`} />
              <span>{partner.nom}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
