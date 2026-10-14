import * as React from "react";
import { useState } from "react";

export default function Photo({ src, alt }) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <div className="pic-frame" role="img" aria-label={alt}>
      {unavailable ? (
        <span className="pic-fallback" aria-hidden="true">
          JCI
          <br />
          Dar Chaabane El Fehri
        </span>
      ) : (
        <img
          src={src}
          alt=""
          className="pic"
          onError={() => setUnavailable(true)}
        />
      )}
    </div>
  );
}
