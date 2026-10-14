import * as React from "react";
import { siteData } from "../data/siteData.js";
import JoinBand from "../components/JoinBand.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";

export default function About() {
  const [activePanel, setActivePanel] = React.useState(null);
  const storyRef = useScrollReveal();
  const mvRef = useScrollReveal();
  const credoRef = useScrollReveal();
  const domainesRef = useScrollReveal();
  const awardsRef = useScrollReveal();
  const presidentsRef = useScrollReveal();

  return (
    <>
      <section className="sec about-band" ref={storyRef}>
        <div className="two">
          <div className="reveal reveal--left">
            <h2>Our story</h2>
            <p>
              JCI Dar Chaabane El Fehri is an organization of engaged young
              citizens, founded in 2009 and reactivated in 2019
            </p>
            <p>
              The organization places a strong focus on young people, providing
              them with opportunities to develop their skills, strengthen their
              leadership, participate in collective projects, and actively
              contribute to their community.
            </p>
            <p>
              Through activities in areas such as social development, culture,
              environment, entrepreneurship, and civic engagement, JCI Dar
              Chaabane El Fehri aims to create a positive and lasting impact on
              the local community.
            </p>
          </div>
          <div
            className="story-gallery reveal reveal--right"
            aria-label="Photos of JCI activities and team"
          >
            <figure className="story-photo">
              <img src="/images/action%2026.jpg" alt="JCI community action in 2026" />
            </figure>
            <figure className="story-photo">
              <img src="/images/annif%2024.jpg" alt="JCI anniversary celebration in 2024" />
            </figure>
            <figure className="story-photo story-photo--team">
              <img src="/images/team%2024.jpg" alt="JCI Dar Chaabane El Fehri team in 2024" />
            </figure>
          </div>
        </div>
      </section>

      <section className="sec" ref={mvRef}>
        <div className={`mv${activePanel ? ` mv--${activePanel}` : ""}`}>
          <button
            type="button"
            className={`mv-card reveal reveal--left${activePanel === "mission" ? " is-active" : ""}`}
            aria-pressed={activePanel === "mission"}
            onClick={() =>
              setActivePanel(activePanel === "mission" ? null : "mission")
            }
          >
            <h3>Our mission</h3>
            <p>
              To provide leadership development opportunities that empower young
              people to create positive change.
            </p>
          </button>
          <button
            type="button"
            className={`mv-card reveal reveal--right${activePanel === "vision" ? " is-active" : ""}`}
            aria-pressed={activePanel === "vision"}
            onClick={() =>
              setActivePanel(activePanel === "vision" ? null : "vision")
            }
          >
            <h3>Our vision</h3>
            <p>To be the leading global network of young leaders.</p>
          </button>
        </div>
      </section>

      <section className="sec alt credo-section" ref={credoRef}>
        <h2 className="reveal">Our credo</h2>
        <div className="credo-card reveal">
          <p className="credo-intro">
            <span lang="ar" dir="rtl">/نحن نعتقد</span>
            <span lang="fr">Nous croyons/</span>
            <span lang="en">We believe:</span>
          </p>
          <ul className="credo-list">
            <li>
              <p lang="ar" dir="rtl">أن الإيمان بالله يعطي للحياة معناها الحقيقي</p>
              <p lang="fr">Que la foi en Dieu donne à la vie son véritable sens.</p>
              <p lang="en">That faith in God gives meaning and purpose to human life.</p>
            </li>
            <li>
              <p lang="ar" dir="rtl">أن التآخي البشري يفوق سيادة الدول</p>
              <p lang="fr">Que la fraternité humaine transcende la souveraineté des nations.</p>
              <p lang="en">That the brotherhood of man transcends the sovereignty of nations.</p>
            </li>
            <li>
              <p lang="ar" dir="rtl">أن الإجتهاد و حرية الأفراد يضمنان العدالة الإجتماعية و الإقتصادية</p>
              <p lang="fr">Que la liberté des individus et de l'entreprise assure mieux la justice économique.</p>
              <p lang="en">That economic justice can best be won by free men through free enterprise.</p>
            </li>
            <li>
              <p lang="ar" dir="rtl">أن قيادة الشعوب، تعتمد القانون و ترفض التعسف و الحيف</p>
              <p lang="fr">Que l'autorité doit s'appuyer sur la loi et non sur l'arbitraire.</p>
              <p lang="en">That government should be of law rather than of men.</p>
            </li>
            <li>
              <p lang="ar" dir="rtl">أن الذات البشرية هي أهم المكاسب وأغناها</p>
              <p lang="fr">Que la personne humaine est la plus précieuse des richesses.</p>
              <p lang="en">That earth's great treasure lies in human personality.</p>
            </li>
            <li>
              <p lang="ar" dir="rtl">أن خدمة الإنسان هي أبلغ عمل في الحياة</p>
              <p lang="fr">Et que servir l'humanité constitue l'œuvre la plus noble d'une vie.</p>
              <p lang="en">And that service to humanity is the best work of life.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="sec opportunity-section" ref={domainesRef}>
        <h2>Our four areas of opportunity</h2>
        <div className="grid">
          {siteData.domaines.map(([title, text]) => (
            <article key={title} className="card reveal">
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sec recognition-section" ref={awardsRef}>
        <h2>Our Awards</h2>
        <div className="grid recognition-grid">
          {siteData.Récompenses.map((award, index) => (
            <article key={award.titre} className="recognition-card reveal">
              {award.image ? (
                <img
                  className="recognition-image"
                  src={award.image}
                  alt={`Award: ${award.titre}`}
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div
                  className="recognition-image-fallback recognition-image-fallback--award"
                  aria-hidden="true"
                >
                  <span className="recognition-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <svg viewBox="0 0 48 48" focusable="false">
                    <path d="M16 7h16v8a8 8 0 0 1-16 0V7Z" />
                    <path d="M16 11H9v4a8 8 0 0 0 8 8M32 11h7v4a8 8 0 0 1-8 8M24 23v9m-7 8h14l-2-8h-10l-2 8Zm2-8h10" />
                  </svg>
                  <span className="recognition-fallback-label">JCI Award</span>
                </div>
              )}
              <div className="recognition-card-content">
                <span className="recognition-eyebrow">Recognition</span>
                <h3>{award.titre}</h3>
                <p>{award.texte}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sec alt recognition-section" ref={presidentsRef}>
        <h2>JCI Dar Chaabane El Fehri Presidents</h2>
        {siteData.presidents.length ? (
          <div className="grid recognition-grid president-grid">
            {siteData.presidents.map((president) => (
              <article key={president.nom} className="recognition-card president-card reveal">
                {president.image ? (
                  <img
                    className="recognition-image"
                    src={president.image}
                    alt={`Portrait of ${president.nom}`}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className="recognition-image-fallback recognition-image-fallback--president"
                    aria-hidden="true"
                  >
                    <span className="president-initials">
                      {president.nom
                        .split(/\s+/)
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  </div>
                )}
                <div className="recognition-card-content">
                  <span className="recognition-eyebrow">Past president</span>
                  <h3>{president.nom}</h3>
                  {president.mandat && <p>{president.mandat}</p>}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="recognition-empty">
            President profiles will appear here once they are added to the
            presidents list in the site data.
          </p>
        )}
      </section>

      <JoinBand />
    </>
  );
}
