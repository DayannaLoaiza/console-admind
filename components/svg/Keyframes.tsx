"use client";
import { SVGProps } from "react";

const Keyframes = ({
  width = 24,
  height = 24,
  className = "",
}: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="currentColor"
      strokeWidth="2"
      className={`${className}`}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 4a2.599 2.599 0 0 0 -2 .957l-4.355 5.24a2.847 2.847 0 0 0 -.007 3.598l4.368 5.256c.499 .6 1.224 .949 1.994 .949a2.599 2.599 0 0 0 2 -.957l4.355 -5.24a2.847 2.847 0 0 0 .007 -3.598l-4.368 -5.256a2.593 2.593 0 0 0 -1.994 -.949z" />
      <path d="M16.382 4.214a1 1 0 0 1 1.32 .074l.084 .094l4.576 5.823c.808 .993 .848 2.396 .13 3.419l-.12 .158l-4.586 5.836a1 1 0 0 1 -1.644 -1.132l.072 -.104l4.596 -5.85a.845 .845 0 0 0 .06 -.978l-.07 -.1l-4.586 -5.836a1 1 0 0 1 .168 -1.404z" />
      <path d="M12.382 4.214a1 1 0 0 1 1.32 .074l.084 .094l4.576 5.823c.808 .993 .848 2.396 .13 3.419l-.12 .158l-4.586 5.836a1 1 0 0 1 -1.644 -1.132l.072 -.104l4.596 -5.85a.845 .845 0 0 0 .06 -.978l-.07 -.1l-4.586 -5.836a1 1 0 0 1 .168 -1.404z" />
    </svg>
  );
};

export default Keyframes;
