import * as React from "react";
import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import { siteData } from "./data/siteData.js";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Events from "./pages/Events.jsx";
import Home from "./pages/Home.jsx";
import Partners from "./pages/Partners.jsx";
import Team from "./pages/Team.jsx";

const pages = {
  "/": Home,
  "/about": About,
  "/team": Team,
  "/events": Events,
  "/partners": Partners,
  "/contact": Contact,
};

function getPath() {
  return window.location.hash.replace(/^#/, "") || "/";
}

export default function App() {
  const [path, setPath] = useState(getPath);
  const [transitionKey, setTransitionKey] = useState(0);
  const Page = pages[path] || Home;

  useEffect(() => {
    function handleHashChange() {
      setPath(getPath());
      setTransitionKey((k) => k + 1);
      window.scrollTo(0, 0);
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <>
      <Header path={path} />
      <main key={transitionKey} className="page-enter">
        <Page />
      </main>
      <footer className="ftr">
        <p>
          © {new Date().getFullYear()} {siteData.nom}. A local JCI chapter.
        </p>
      </footer>
    </>
  );
}
