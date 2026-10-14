import * as React from "react";
import { useEffect, useRef } from "react";
import { navigation, siteData, socialIcons } from "../data/siteData.js";
import Link from "../components/Link.jsx";
import Photo from "../components/Photo.jsx";
import useScrollReveal from "../hooks/useScrollReveal.js";
import useCountUp from "../hooks/useCountUp.js";

/** Stats displayed in the band between sections */
const STATS = [
  { value: 15, suffix: "+", label: "Années d'existence" },
  { value: 20, suffix: "+", label: "Membres actifs" },
  { value: 20, suffix: "+", label: "Projets réalisés" },
];

function StatItem({ value, suffix, label }) {
  const { ref, value: animated } = useCountUp(value);
  return (
    <div ref={ref} className="stats-item">
      <span className="stats-number">
        {animated}
        <span className="stats-suffix">{suffix}</span>
      </span>
      <span className="stats-label">{label}</span>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const whoRevealRef = useScrollReveal();
  const projectsRevealRef = useScrollReveal();

  // Parallax on hero background
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    function onScroll() {
      const scrollY = window.scrollY;
      hero.style.backgroundPositionY = `calc(50% + ${scrollY * 0.35}px)`;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="hero"
        style={{
          backgroundImage: `url("/images/picture.png")`,
        }}
      >
        <div className="hero-inner">
          <h1>{siteData.nom}</h1>
          <p>{siteData.slogan}</p>
          <Link to="/about" className="btn btn-lg">
            About us
          </Link>
        </div>
      </section>

      {/* ── Stats band ── */}
      <div className="stats-band">
        {STATS.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>

      {/* ── Who are we? ── */}
      <section className="sec" ref={whoRevealRef}>
        <h2 className="reveal">Who are we?</h2>
        <div className="two">
          <div className="reveal reveal--left">
            <p>
              JCI Dar Chaabane El Fehri is a local organization of Junior
              Chamber International (JCI) dedicated to developing young leaders
              aged 18 to 40.
            </p>
            <p>
              It focuses on empowering young people, developing their skills and
              leadership, through various projects and initiatives.
            </p>
            <Link to="/about" className="btn">
              Learn more
            </Link>
          </div>
          <div className="reveal reveal--right">
            <Photo
              src="/images/team building.jpg"
              alt="JCI Dar Chaabane El Fehri members"
            />
          </div>
        </div>
      </section>

      {/* ── Our projects ── */}
      <section className="sec alt" ref={projectsRevealRef}>
        <h2>Our projects</h2>
        <div className="grid">
          {siteData.projets.map((project) => (
            <article key={project.titre} className="card reveal project-card">
              <Photo src={project.image} alt={project.titre} />
              <h3>{project.titre}</h3>
              <p>{project.texte}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Connect / Footer strip ── */}
      <section className="home-connect">
        <div className="home-connect-inner">
          <div className="home-connect-social">
            <h2>Rejoignez-nous sur les réseaux sociaux</h2>
            <div className="home-connect-icons">
              {Object.entries(siteData.liens).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`JCI Dar Chaabane El Fehri sur ${name}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d={socialIcons[name]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div className="home-connect-columns">
            <div className="home-connect-brand">
              <img src="/images/logo2.jpg" alt="JCI Dar Chaabane El Fehri" />
              <p>{siteData.slogan}</p>
            </div>
            <nav className="home-connect-links" aria-label="Liens rapides">
              <h3>Liens rapides</h3>
              {navigation.map(([to, label]) => (
                <Link key={to} to={to}>
                  <span aria-hidden="true">›</span>
                  {label}
                </Link>
              ))}
            </nav>
            <div className="home-connect-contact">
              <h3>Contactez-nous</h3>
              <p>
                <span aria-hidden="true">⌖</span>
                Dar Chaabane El Fehri, Tunisie
              </p>
              <a href={`mailto:${siteData.email}`}>
                <span aria-hidden="true">✉</span>
                {siteData.email}
              </a>
            </div>
            <div className="home-connect-join">
              <h3>Rejoignez-nous</h3>
              <Link to="/contact" className="home-connect-button">
                Rejoignez-nous <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
