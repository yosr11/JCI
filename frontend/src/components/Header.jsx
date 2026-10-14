import * as React from "react";
import { useState, useEffect } from "react";
import { navigation, siteData, socialIcons } from "../data/siteData.js";
import Link from "./Link.jsx";

export default function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`hdr${scrolled ? " hdr--scrolled" : ""}`}>
      <Link to="/" className="brand" onClick={() => setOpen(false)}>
        <img
  src="/images/logo.png"
  alt="Junior Chamber International"
  className="brand-logo"
/>
      </Link>
      <button
        className="burger"
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="site-navigation"
        onClick={() => setOpen((isOpen) => !isOpen)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav
        id="site-navigation"
        className={open ? "nav open" : "nav"}
        aria-label="Main navigation"
      >
        {navigation.map(([to, label]) => (
          <Link
            key={to}
            to={to}
            className={path === to ? "on" : ""}
            aria-current={path === to ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <span className="socials">
          {Object.entries(siteData.liens).map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              aria-label={name}
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d={socialIcons[name]} />
              </svg>
            </a>
          ))}
        </span>
        <Link
          to=""
          className="btn"
          onClick={() => setOpen(false)}
        >
          Sign In
        </Link>
      </nav>
    </header>
  );
}
