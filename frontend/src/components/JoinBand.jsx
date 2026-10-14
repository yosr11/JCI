import * as React from "react";
import Link from "./Link.jsx";

export default function JoinBand() {
  return (
    <section className="join">
      <div>
        <h2>Ready to make a difference?</h2>
        <p>Join a team of young people taking action.</p>
      </div>
      <Link to="/contact" className="btn btn-light btn-lg">
        Join us
      </Link>
    </section>
  );
}
