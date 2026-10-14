import * as React from "react";
import { siteData } from "../data/siteData.js";
import PageTitle from "../components/PageTitle.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

function MemberCard({ member, featured = false, onImageClick }) {
  return (
    <article className={`team-member reveal${featured ? " team-member--featured" : ""}`}>
      <button
        className="team-member-photo"
        type="button"
        onClick={() => onImageClick(member)}
        aria-label={`Agrandir la photo de ${member.nom}`}
      >
        {member.image ? (
          <img src={member.image} alt="" loading="lazy" />
        ) : (
          <span className="team-member-avatar" aria-hidden="true">
            {member.nom
              .split(/\s+/)
              .map((part) => part[0])
              .join("")}
          </span>
        )}
        <span className="team-member-zoom" aria-hidden="true">+</span>
      </button>
      <h3>{member.nom}</h3>
      <p>{member.role}</p>
    </article>
  );
}

export default function Team() {
  const [selectedMember, setSelectedMember] = React.useState(null);
  const dialogRef = React.useRef(null);
  const teamRef = useScrollReveal({ threshold: 0.08 });

  const president = siteData.equipe.find((member) => member.role === "President");
  const secondRow = siteData.equipe.filter((member) =>
    ["Immediate Past President", "Legal Advisor"].includes(member.role),
  );
  const otherMembers = siteData.equipe.filter(
    (member) => member !== president && !secondRow.includes(member),
  );

  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedMember && !dialog.open) {
      dialog.showModal();
    } else if (!selectedMember && dialog.open) {
      dialog.close();
    }
  }, [selectedMember]);

  return (
    <>
      <PageTitle
        title=" Our Executive Board 2026"
        subtitle="Meet the board leading JCI Dar Chaabane El Fehri."
      />
      <section className="sec" ref={teamRef}>
        <div className="team-layout">
          {president && (
            <div className="team-row team-row--president">
              <MemberCard
                member={president}
                featured
                onImageClick={setSelectedMember}
              />
            </div>
          )}
          {secondRow.length > 0 && (
            <div className="team-row team-row--support">
              {secondRow.map((member) => (
                <MemberCard
                  key={member.role}
                  member={member}
                  onImageClick={setSelectedMember}
                />
              ))}
            </div>
          )}
          {otherMembers.length > 0 && (
            <div className="team-row team-row--members">
              {otherMembers.map((member) => (
                <MemberCard
                  key={member.role}
                  member={member}
                  onImageClick={setSelectedMember}
                />
              ))}
            </div>
          )}
        </div>
      </section>
      <dialog
        ref={dialogRef}
        className="team-photo-dialog"
        aria-label={selectedMember ? `Photo de ${selectedMember.nom}` : undefined}
        onClose={() => setSelectedMember(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            setSelectedMember(null);
          }
        }}
      >
        {selectedMember && (
          <>
            <button
              className="team-photo-close"
              type="button"
              onClick={() => setSelectedMember(null)}
              aria-label="Fermer la photo"
            >
              ×
            </button>
            {selectedMember.image ? (
              <img src={selectedMember.image} alt={selectedMember.nom} />
            ) : (
              <div className="team-photo-avatar" aria-hidden="true">
                {selectedMember.nom
                  .split(/\s+/)
                  .map((part) => part[0])
                  .join("")}
              </div>
            )}
            <div className="team-photo-caption">
              <h2>{selectedMember.nom}</h2>
              <p>{selectedMember.role}</p>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
