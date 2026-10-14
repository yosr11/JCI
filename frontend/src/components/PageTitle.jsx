import * as React from "react";

export default function PageTitle({ title, subtitle }) {
  return (
    <section className="ptitle">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </section>
  );
}
