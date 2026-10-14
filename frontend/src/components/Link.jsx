import * as React from "react";

export default function Link({ to, ...props }) {
  return <a href={`#${to}`} {...props} />;
}
