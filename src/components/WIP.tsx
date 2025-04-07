import { DetailedHTMLProps, HTMLAttributes } from "react";

export function WIP(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
  return (
    <div
      style={{
        background: "repeating-linear-gradient(45deg, #cccccc, #ffffff 10px)",
      }}
      {...props}
    ></div>
  );
}
